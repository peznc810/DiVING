import express from 'express'
const router = express.Router()

import db from '../db.mjs'
import 'dotenv/config.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//商品列表
router.get('/', async (req, res) => {
  let product, error
  await getProduct(req)
    .then((result) => {
      product = result
    })
    .catch((err) => {
      error = err
    })
  if (error) {
    res.status(400).json(error)
  }
  if (product) {
    res.status(200).json(product)
  }
})

//商品細節
router.get('/id', async (req, res) => {
  const pid = req.query.pid;
  let product, error
  await getProductID(pid)
    .then((result) => {
      product = result
    })
    .catch((err) => {
      error = err
    })
  if (error) {
    res.status(400).json(error)
  }
  if (product) {
    res.status(200).json(product)
  }
})

//post 傳送到資料庫
router.post('/comment', async (req, res) => {
  const payload = {
    score: req.body.score,
    comment: req.body.comment,
    product_id: req.body.product_id, 
    member_id: req.body.member_id
  }
  // member_id 身份驗證, member_id 是否有購買 product_id
  // step1. member_id 是否存在 
  // step2. 抓取是否有 member_id 購買 prodcut_id 的訂單記錄 (訂單)
  
  //將取得的東西寫入資料庫
  await insertComment(payload)
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

// get 打印評論
router.get('/comment', async (req, res) => {
  const pid = req.query.pid;
  let comment, error
  await getComment(pid)
    .then((result) => {
      comment = result
    })
    .catch((err) => {
      error = err
    })
  if (error) {
    res.status(400).json(error)
  }
  if (comment) {
    res.status(200).json(comment)
  }
})

// 收藏功能
//post 傳送到資料庫
router.post('/collect', async (req, res) => {
  const payload = {
    product_id: req.body.product_id, 
    member_id: req.body.member_id
  }
  // member_id 身份驗證
  // step. member_id 是否存在 ?
  
  //將取得的東西寫入資料庫
  await insertCollect(payload)
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

router.get('/collect', async (req, res) => {
  const mid = req.query.mid;
  let comment, error
  await getCollect(mid)
    .then((result) => {
      comment = result
    })
    .catch((err) => {
      error = err
    })
  if (error) {
    res.status(400).json(error)
  }
  if (comment) {
    res.status(200).json(comment)
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

function getComment(pid) {
  return new Promise(async (resolve, reject) => {
    const [result] = await db.execute('SELECT * FROM `star` WHERE product_id = ?' ,[pid])
    if (result) {
      resolve(result)
    } else {
      reject({ status: 'error', msg: 'err' })
    }
  })
}

function insertComment(data) {
  return new Promise(async (resolve, reject) => {
    const [result] = await db.execute('INSERT INTO star (member_id, product_id, score, comment) VALUES (?, ?, ?, ?);', [data.member_id, data.product_id, data.score, data.comment])
    if (result) {
      resolve({message: 'Success'})
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


function getCollect(mid) {
  return new Promise(async (resolve, reject) => {
    const [result] = await db.execute('SELECT * FROM `collect` WHERE member_id = ?' ,[mid])
    if (result) {
      resolve(result)
    } else {
      reject({ status: 'error', msg: 'err' })
    }
  })
}

function insertCollect(data) {
  return new Promise(async (resolve, reject) => {
    const [result] = await db.execute('INSERT INTO collect (member_id, product_id) VALUES (?, ?);', [data.member_id, data.product_id])
    if (result) {
      resolve({message: 'Success'})
    } else {
      reject({ status: 'error', msg: 'err' })
    }
  })
}

export default router
