import express from 'express';
const router = express.Router();

import db from '../db.mjs';
import 'dotenv/config.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/", async(req,res)=>{
  let order, error
  await getOrderDetail(req).then(result => {
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

function getOrderDetail(req) {
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

function getOrder(orderId) {

  return new Promise(async (resolve, reject) => {

    const [result] = await db.execute(
      'SELECT order_detail.*, COALESCE(product.name, lesson.name) AS name, COALESCE(product.price, lesson.price) AS price FROM order_detail LEFT JOIN product ON product.id = order_detail.product_id LEFT JOIN lesson ON lesson.id =order_detail.lesson_id WHERE order_detail.order_id = ?',[orderId]
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

export default router