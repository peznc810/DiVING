import express from 'express';
const router = express.Router();

import db from '../db.mjs';
import 'dotenv/config.js'

import { createLinePayClient } from 'line-pay-merchant'

import { v4 as uuidv4 } from 'uuid'

const linePayClient = createLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
  env: process.env.NODE_ENV,
})



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/create-order", async(req, res)=>{
  const userId = req.body.user_id
  const orderId =uuidv4()
  const packgeId = uuidv4()

  //傳送給line pay的資料
  const order = {
    orderId: orderId,
    currency: "TWD",
    amount: req.body.totalPrice,
    packages: [
      {
        id: packgeId,
        amount: req.body.totalPrice,
        products: req.body.products2,
      },
    ],
    options:{ display: {locale:"zh_TW"}},
  }

  //寫入資料庫的資料 order
  const dbOrder = {
    id: orderId,
    user_id : userId,
    total_price : req.body.totalPrice,
    status: "建立成功",
    order_info: JSON.stringify(order),
  }

  const products=req.body.products

  // 寫入資料庫的資料 order_detail
  products.forEach(product => {
    const dbOrderDetail = {
      order_id: orderId,
      product_id: product.product_id,
      lesson_id: product.lesson_id,
      order_time: product.order_time,
      num: product.num,
    }
  });

  res.json({status: "success", data: {order},dbOrder :{dbOrder}})
})

router.get("/reserve", async(req,res)=>{
  if(!req.query.orderId){
    return res.json({status:"error", message: "order id不存在"})
  }

  const orderId = req.query.orderId

  const redirectUrls = {
    confirmUrl: process.env.REACT_REDIRECT_CONFIRM_URL,
    cancelUrl: process.env.REACT_REDIRECT_CANCEL_URL,
  }

  let orderRecord, error

  await getOrder(orderId).then(result => {
    orderRecord = result;
  }).catch(err => {
    error = err
  })
  if (error) {
    res.status(400).json(error)
  }
  if (orderRecord) {
    res.status(200).json(orderRecord)
  }

  const order = JSON.parse(orderRecord.order_info)

  console.log(`獲得訂單資料，內容如下：`)
  console.log(order)

  try{
    const linePayResponse = await linePayClient.request.send({
      body: { ...order, redirectUrls },
    })

    const reservation = JSON.parse(JSON.stringify(order))

    reservation.returnCode = linePayResponse.body.returnCode
    reservation.returnMessage = linePayResponse.body.returnMessage
    reservation.transactionId = linePayResponse.body.info.transactionId
    reservation.paymentAccessToken =
      linePayResponse.body.info.paymentAccessToken

    console.log(`預計付款資料(Reservation)已建立。資料如下:`)
    console.log(reservation)

    await updateOrder(JSON.stringify(reservation), reservation.transactionId, orderId).then().catch(err => {
      error = err
    })
    if (error) {
      res.status(400).json(error)
    }

    res.redirect(linePayResponse.body.info.paymentUrl.web)
  }catch(e){
    console.log("error", e);
  }
})

router.get("/confirm", async(req, res)=>{
  const transactionId = req.query.transactionId

  let dbOrder, error

  await getOrderByTid(transactionId).then(result => {
    dbOrder = result;
  }).catch(err => {
    error = err
  })
  if (error) {
    res.status(400).json(error)
  }
  if (orderRecord) {
    res.status(200).json(orderRecord)
  }

  const transaction = JSON.parse(dbOrder.reservation)

  console.log(transaction);

  const amount = transaction.amount

  try {
    const linePayResponse = await linePayClient.confirm.send({
      transactionId: transactionId,
      body: {
        currency: 'TWD',
        amount: amount,
      },
    })

    console.log(linePayResponse);

    let status = "paid"

    if (linePayResponse.body.returnCode !== '0000') {
      status = 'fail'
    }

    await updateOrderStatus(status, linePayResponse.body.returnCode, JSON.stringify(linePayResponse.body), dbOrder.id)

    return res.json({ status: 'success', data: linePayResponse.body })
  }catch(error){
    return res.json({status: "fail", data: error.data})
  }
})

router.get("/check-transaction", async( req,res)=>{
  const transactionId = req.query.transactionId

  try{
    const linePayResponse = await linePayClient.checkPaymentStatus.send({
      transactionId: transactionId,
      params: {},
    })

    res.json(linePayResponse.body)
  }catch(e){
    res.json({ error: e })
  }
})

function getOrder(orderId) {
  return new Promise(async (resolve, reject) => {
    const result = await db.execute(
      'SELECT * FROM `order` WHERE `id` = ?',[orderId]
    );
    if (result) {
      resolve(result)
    } else {
      reject({ status: "error", msg: "err" })
    }
  })
}

function getOrderByTid(transactionId) {
  return new Promise(async (resolve, reject) => {
    const result = await db.execute(
      'SELECT * FROM `order` WHERE `transaction_id` = ?',[transactionId]
    );
    if (result) {
      resolve(result)
    } else {
      reject({ status: "error", msg: "err" })
    }
  })
}

function updateOrder(reservation, transaction_id, orderId){
  return new Promise(async (resolve, reject)=>{
    await db.execute("UPDATE `order` SET `reservation` = ?, `transaction_id` = ? WHERE `order`.`id` =?;",[reservation, transaction_id, orderId])
  })
}

function updateOrderStatus(status, return_code, confirm, orderId){
  return new Promise(async (resolve, reject)=>{
    await db.execute("UPDATE `order` SET `status` = ?, `return_code` = ?, `confirm` = ? WHERE `order`.`id` =?;",[status, return_code, confirm, orderId])
  })
}

function addOrder(dbOrder){
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1，并且使用padStart()函数补齐两位
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const datetimeNow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return new Promise(async (resolve, reject) => {
    const [result] = await db.execute(
      'INSERT INTO `order`(id, user_id, total_price, payment, shipping, status, order_info, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',[
        dbOrder.id, dbOrder.user_id, dbOrder.total_price, dbOrder.payment, dbOrder.shipping, dbOrder.status, dbOrder.order_info, datetimeNow
      ]
    );
    if (result) {
      resolve(result)
    } else {
      reject({ status: "error", msg: "err" })
    }
  })
}

function addOrderDetail(dbOrderDetail){
  return new Promise(async (resolve, reject) => {
    if(dbOrderDetail.product_id){
      const [result] = await db.execute(
        'INSERT INTO `order_detail`(order_id, product_id, num) VALUES (?, ?);',[
          dbOrderDetail.order_id, dbOrderDetail.product_id, dbOrderDetail.num
        ]
      );
    }else if(dbOrderDetail.lesson_id){
      const [result] = await db.execute(
        'INSERT INTO `order_detail`(order_id, lesson_id, num, order_time) VALUES (?, ?);',[
          dbOrderDetail.order_id, dbOrderDetail.lesson_id, dbOrderDetail.num, dbOrderDetail.order_time
        ]
      );
    }

    if (result) {
      resolve(result)
    } else {
      reject({ status: "error", msg: "err" })
    }
  })
}

//測試用
router.get("/", async(req,res)=>{
  let test, error
  await getTest(req).then(result => {
    test = result;
  }).catch(err => {
    error = err
  })
  if (error) {
    res.status(400).json(error)
  }
  if (test) {
    res.status(200).json(test)
  }
})

router.post("/", async(req, res)=>{

  let test, error
  const {user_name, user_phone} = req.body
  await addTest(user_name,user_phone).then(result => {
    test = result;
  }).catch(err => {
    error = err
  })
  if (error) {
    res.status(400).json(error)
  }
  if (test) {
    res.status(200).json(test)
  }
})

function getTest(req) {
  return new Promise(async (resolve, reject) => {
    const [result] = await db.execute(
      'SELECT * FROM `test`'
    );
    if (result) {
      resolve(result)
    } else {
      reject({ status: "error", msg: "err" })
    }
  })
}

function addTest(user_name, user_phone){
  return new Promise(async (resolve, reject) => {
    const [result] = await db.execute(
      'INSERT INTO `test`(user_name, user_phone) VALUES (?, ?);',[
        user_name, user_phone
      ]
    );
    if (result) {
      resolve(result)
    } else {
      reject({ status: "error", msg: "err" })
    }
  })
}



export default router