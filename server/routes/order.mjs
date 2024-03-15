import express from 'express';
const router = express.Router();

import db from '../db.mjs';
import 'dotenv/config.js'

import { v4 as uuidv4 } from 'uuid'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/", async(req,res)=>{
  let order, error
  await getAllOrderDetail(req).then(result => {
    order = result;
  }).catch(err => {
    error = err
  })
  if (error) {
    res.status(400).json(error)
  }
  if (order) {
    res.status(200).json(order)
  }
})

router.post("/create-order", async(req, res)=>{
  const userId = req.body.user_id
  const orderId = Date.now()

  const { totalPrice, products, receiver, credit_card, order_note,shipment } = req.body;

  //寫入資料庫的資料 order
  const dbOrder = {
    id: orderId,
    user_id : userId,
    total_price : totalPrice,
    payment: "取貨付款",
    shipping: shipment,
    status: "建立成功",
    receiver : JSON.stringify(receiver),
    credit_card: JSON.stringify(credit_card),
    order_note,
  }


  if(credit_card){
    createOrderCreditCard(dbOrder)
  }else{
    createOrder(dbOrder)
  }

  // 寫入資料庫的資料 order_detail
  products.forEach(({ product_id, lesson_id, order_time, product_detail, num }) => {
    const dbOrderDetail = {
      order_id: orderId,
      product_id,
      lesson_id,
      order_time,
      product_detail,
      num,
    };
    createOrderDetail(dbOrderDetail);
  });

  res.json({status: "success", data:{dbOrder}})
})

router.get("/order-detail", async(req,res)=>{
  const orderId = req.query.orderId;
  let order, error
  await getOrderDetail(orderId).then(result => {
    order = result;
  }).catch(err => {
    error = err
  })
  if (error) {
    res.status(400).json(error)
  }
  if (order) {
    res.status(200).json(order)
  }
})

router.get("/order", async(req,res)=>{
  const orderId = req.query.orderId;
  let order, error
  await getOrder(orderId).then(result => {
    order = result;
  }).catch(err => {
    error = err
  })
  if (error) {
    res.status(400).json(error)
  }
  if (order) {
    res.status(200).json(order)
  }
})

router.get("/product", async(req,res)=>{
    let product, error
    await getProduct(req).then(result => {
      product = result;
    }).catch(err => {
      error = err
    })
    if (error) {
      res.status(400).json(error)
    }
    if (product) {
      res.status(200).json(product)
    }
  })

  router.get("/lesson", async(req,res)=>{
    let lesson, error
    await getLesson(req).then(result => {
      lesson = result;
    }).catch(err => {
      error = err
    })
    if (error) {
      res.status(400).json(error)
    }
    if (lesson) {
      res.status(200).json(lesson)
    }
  })

  router.get("/user-coupon/:userId", async(req,res)=>{
    const userId = req.query.userId
    let coupon, error
    await getUserCoupon(userId).then(result => {
      coupon = result;
    }).catch(err => {
      error = err
    })
    if (error) {
      res.status(400).json(error)
    }
    if (coupon) {
      res.status(200).json(coupon)
    }
  })

function getAllOrderDetail(req) {
  return new Promise(async (resolve, reject) => {
    const [result] = await db.execute(
      'SELECT * FROM `order_detail`'
    );
    if (result) {
      resolve(result)
    } else {
      reject({ status: "error", msg: "err" })
    }
  })
}

function getOrderDetail(orderId) {

  return new Promise(async (resolve, reject) => {

    const [result] = await db.execute(
      'SELECT order_detail.*, COALESCE(product.name, lesson.title) AS name, COALESCE(product.price, lesson.price) AS price FROM order_detail LEFT JOIN product ON product.id = order_detail.product_id LEFT JOIN lesson ON lesson.id =order_detail.lesson_id WHERE order_detail.order_id = ?',[orderId]
    );
    if (result) {
      resolve(result)
    } else {
      reject({ status: "error", msg: "err" })
    }
  })
}

function getOrder(orderId) {

  return new Promise(async (resolve, reject) => {

    const [result] = await db.execute(
      'SELECT * FROM `order` WHERE order.id = ? ',[orderId]
    );
    if (result) {
      resolve(result)
    } else {
      reject({ status: "error", msg: "err" })
    }
  })
}

  function getProduct(req) {
    return new Promise(async (resolve, reject) => {
      const [result] = await db.execute(
        'SELECT * FROM `product`'
      );
      if (result) {
        resolve(result)
      } else {
        reject({ status: "error", msg: "err" })
      }
    })
  }

  function getLesson(req) {
    return new Promise(async (resolve, reject) => {
      const [result] = await db.execute(
        'SELECT * FROM `lesson`'
      );
      if (result) {
        resolve(result)
      } else {
        reject({ status: "error", msg: "err" })
      }
    })
  }

  function getUserCoupon(userId) {
    return new Promise(async (resolve, reject) => {
      const [result] = await db.execute(
        'SELECT coupon_has.*, coupon.name FROM coupon_has JOIN coupon ON coupon_has.coupon_id = coupon.id WHERE coupon_has.user_id = ?',[userId]
      );
      if (result) {
        resolve(result)
      } else {
        reject({ status: "error", msg: "err" })
      }
    })
  }

  function createOrder(dbOrder){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    const datetimeNow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    return new Promise((resolve, reject) => {
      db.execute(
        'INSERT INTO `order`(id, user_id, total_price, payment, shipping, status, receiver, created_at, order_note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',[
          dbOrder.id, dbOrder.user_id, dbOrder.total_price, "取貨付款", dbOrder.shipping, dbOrder.status, dbOrder.receiver, , datetimeNow ,dbOrder.order_note
        ]
      ).then(([result]) => {
        if (result) {
          resolve(result);
        } else {
          reject({ status: "error", msg: "err" });
        }
      })
      .catch(error => {
        reject({ status: "error", msg: error.message });
      });
      
    })
  }

  function createOrderCreditCard(dbOrder){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    const datetimeNow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    return new Promise((resolve, reject) => {
      db.execute(
        'INSERT INTO `order`(id, user_id, total_price, payment, shipping, status, receiver, created_at, credit_card, order_note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',[
          dbOrder.id, dbOrder.user_id, dbOrder.total_price, "信用卡付款", dbOrder.shipping, dbOrder.status, dbOrder.receiver, datetimeNow, dbOrder.credit_card ,dbOrder.order_note
        ]
      ).then(([result]) => {
        if (result) {
          resolve(result);
        } else {
          reject({ status: "error", msg: "err" });
        }
      })
      .catch(error => {
        reject({ status: "error", msg: error.message });
      });
      
    })
  }

  function createOrderDetail(dbOrderDetail) {
    return new Promise((resolve, reject) => {
      let sql = '';
      let values = [];
  
      if (dbOrderDetail.product_id) {
        sql = 'INSERT INTO `order_detail`(order_id, product_id, product_detail, num) VALUES (?, ?, ?, ?);';
        values = [dbOrderDetail.order_id, dbOrderDetail.product_id, dbOrderDetail.product_detail, dbOrderDetail.num];
      } else if (dbOrderDetail.lesson_id) {
        sql = 'INSERT INTO `order_detail`(order_id, lesson_id, num, order_time) VALUES (?, ?, ?, ?);';
        values = [dbOrderDetail.order_id, dbOrderDetail.lesson_id, dbOrderDetail.num, dbOrderDetail.order_time];
      } else {
        reject({ status: "error", msg: "Missing product_id or lesson_id" });
        return;
      }
  
      db.execute(sql, values)
        .then(([result]) => {
          if (result) {
            resolve(result);
          } else {
            reject({ status: "error", msg: "Insertion failed" });
          }
        })
        .catch(error => {
          reject({ status: "error", msg: error.message });
        });
    });
  }

export default router