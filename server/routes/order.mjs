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

//測試用
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

router.get("/product", async(req,res)=>{
    let order, error
    await getProduct(req).then(result => {
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

  router.get("/lesson", async(req,res)=>{
    let order, error
    await getLesson(req).then(result => {
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

export default router