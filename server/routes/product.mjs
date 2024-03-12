import express from 'express'
const router = express.Router()

import db from '../db.mjs'
import 'dotenv/config.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//測試用

//post 傳送到資料庫
// get 打印評論
router.get('/', async (req, res) => {
  let order, error
  await getProduct(req)
    .then((result) => {
      order = result
    })
    .catch((err) => {
      error = err
    })
  if (error) {
    res.status(400).json(error)
  }
  if (order) {
    res.status(200).json(order)
  }
})

//商品細節
router.get('/id', async (req, res) => {
  const pid = req.query.pid;
  let order, error
  await getProductID(pid)
    .then((result) => {
      order = result
    })
    .catch((err) => {
      error = err
    })
  if (error) {
    res.status(400).json(error)
  }
  if (order) {
    res.status(200).json(order)
  }
})


function getProduct(req) {
  return new Promise(async (resolve, reject) => {
    const [result] = await db.execute('SELECT * FROM `product`')
    if (result) {
      resolve(result)
    } else {
      reject({ status: 'error', msg: 'err' })
    }
  })
}

function getProductID(pid) {
  return new Promise(async (resolve, reject) => {
    const [result] = await db.execute('SELECT * FROM `product` WHERE product.id = ?' ,[pid])
    if (result) {
      resolve(result)
    } else {
      reject({ status: 'error', msg: 'err' })
    }
  })
}

export default router
