import express from 'express'
import multer from 'multer'
import db from '../db.mjs'
import jwt from 'jsonwebtoken'
import moment from 'moment'

// middlewares
import checkToken from '../middlewares/checkToken.mjs'

const router = express.Router()

// 引入.env檔
import 'dotenv/config.js'
const secretKey = process.env.SECRET_KEY

const app = express()
const upload = multer()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 登入
router.post('/login', upload.none(), async (req, res) => {
  // 接收client的require
  const { userEmail, userPWD } = req.body
  // 比對db資料
  // 如果比對成功回傳資料，如果失敗則回傳錯誤訊息
  const [[userData]] = await db.execute(
    'SELECT * FROM `users` WHERE `email` = ? AND `password` = ?',
    [userEmail, userPWD]
  )
  if (userData) {
    let token = jwt.sign({
      id: userData.id,
      userEmail: userData.email,
      userName: userData.name,
      avatar: userData.avatar,
    }, secretKey, { expiresIn: '1h' })
    res.status(200).json({ status: 'success', msg: '登入成功', token })
  } else {
    res.status(401).json({
      status: "error",
      msg: "帳號或密碼錯誤",
    })
  }
})

// 登出
router.post('/logout', checkToken, (req, res) => {
  let token = req.get("Authorization");
  if (token && token.indexOf("Bearer ") === 0) {
    token = token.slice(7);
  };
  // 如果沒有在名單中，把目前的登出token放入名單中
  // blackList.push(token)
  // 初始化token
  token = jwt.sign({
    id: '',
    userEmail: '',
    userName: '',
    avatar: '',
  }, secretKey, { expiresIn: '-10s' })
  res.status(200).json({
    status: 'success',
    msg: '登出成功',
  })
})

// 常駐登入狀態
router.post('/status', checkToken, async (req, res) => {
  // 可能不止這裡需要解譯過的資料，所以放到checkToken共用
  // 拿解譯過後的token資料過來跟資料庫比對
  const { userEmail } = req.decode

  // 之後要把密碼重新編碼後再存入資料庫
  const [[userData]] = await db.execute(
    'SELECT * FROM `users` WHERE `email` = ?',
    [userEmail]
  )

  if (userData) {
    // 重新核發token，前台需重新設置localStorage
    // 目前只有拿這些資料，如果之後需要其他資料就用[password, ..userData]，取出除了密碼以外的資料
    let token = jwt.sign({
      id: userData.id,
      userEmail: userData.email,
      userName: userData.name,
      avatar: userData.avatar,
    }, secretKey, { expiresIn: '1h' })
    res.status(200).json({
      status: 'success',
      msg: '使用者已登入',
      token
    })
  } else {
    res.status(401).json({
      status: 'error',
      msg: '請重新登入'
    })
  }
})

// 註冊
router.post('/register', upload.none(), async (req, res) => {
  const { userName, userEmail, userPWD } = req.body
  const [[userData]] = await db.execute(
    'SELECT * FROM `users` WHERE `email` = ?',
    [userEmail]
  )
  if (userData) {
    res.status(409).json({
      status: 'error',
      msg: '此帳號已註冊'
    })
    return false
  }
  await db.execute(
    "INSERT INTO `users` (`email`, `password`, `name`) VALUES (?, ?, ?);", [userEmail, userPWD, userName]
  )
    .then(() => {
      res.status(200).json({ status: 'success', msg: '註冊成功' })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ status: 'error', msg: '註冊失敗，請再試一次' })
    })
})

// Google登入
router.post('/google-login', async (req, res) => {
  // 接收client的require
  const { email, uid } = req.body
  // 比對db資料
  // 如果比對成功回傳資料，如果失敗則回傳錯誤訊息
  const [[userData]] = await db.execute(
    'SELECT * FROM `users` WHERE `email` = ? AND `google_uid` = ?',
    [email, uid]
  )
  if (userData) {
    let token = jwt.sign({
      id: userData.id,
      userEmail: userData.email,
      userName: userData.name,
      avatar: userData.avatar,
    }, secretKey, { expiresIn: '1h' })
    res.status(200).json({ status: 'success', msg: '登入成功', token })
  } else {
    res.status(401).json({
      status: "error",
      msg: "查無此使用者，請先註冊帳號",
    })
  }
})

// Google註冊
router.post('/google-register', async (req, res) => {
  const { displayName, email, photoURL, uid } = req.body
  const [[userData]] = await db.execute(
    'SELECT * FROM `users` WHERE `google_uid` = ?',
    [uid]
  )
  if (userData) {
    res.status(409).json({
      status: 'error',
      msg: '此帳號已註冊'
    })
    return
  }
  await db.execute(
    "INSERT INTO `users` (`name`, `email`, `avatar`, `google_uid`) VALUES (?, ?, ?, ?);", [displayName, email, photoURL, uid]
  )
    .then(() => {
      res.status(200).json({ status: 'success', msg: '註冊成功' })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ status: 'error', msg: '註冊失敗，請再試一次' })
    })
})

// 讀取profile
router.get('/:id', checkToken, async (req, res) => {
  const id = req.params.id
  const checkId = req.decode.id.toString()

  // 確認授權會員與請求取得的會員資料是否為同一人
  if (checkId !== id) {
    return res.json({ status: 'error', message: '會員資料存取失敗' })
  }

  const [[userData]] = await db.execute(
    'SELECT * FROM `users` WHERE `id` = ? ',
    [id]
  )

  if (userData) {
    res.status(200).json({ status: 'success', userData })
  } else {
    res.status(404).json({ status: 'error', msg: '查無資料' })
  }
})

// 更新profile
router.put('/:id/profile', checkToken, upload.none(), async (req, res) => {
  const uid = req.params.id
  const checkId = req.decode.id.toString()
  if (checkId !== uid) {
    return res.status(401).json({ status: 'error', msg: '無法更新會員資料' })
  }
  const { name, birth, email, tel, address, id } = req.body

  // 檢查必填欄位是否有空字串
  if (!id || !name || !email) {
    return res.json({ status: 'error', msg: '缺少必要資料' })
  }

  await db.execute(
    'UPDATE `users` SET `name` = ?,`birth` = ?,`email` = ?,`tel` = ?,`address` = ? WHERE `id` = ? ',
    [name, birth, email, tel, address, id]
  )
    .then(result => {
      console.log(result)
      res.status(200).json({ status: 'success', msg: '會員資料更新成功' })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ status: 'error', msg: '會員資料更新失敗' })
    })
})

// 更新password
router.put('/:id/password', checkToken, upload.none(), async (req, res) => {
  const uid = req.params.id
  const checkId = req.decode.id.toString()
  if (checkId !== uid) {
    return res.status(401).json({ status: 'error', msg: '無法更新會員資料' })
  }
  const { origin, newPWD, id } = req.body

  // 檢查必填欄位是否有空字串
  if (!id || !newPWD) {
    return res.json({ status: 'error', msg: '缺少必要資料' })
  }

  await db.execute(
    'UPDATE `users` SET `password` = ? WHERE `id` = ? AND `password` = ?',
    [newPWD, id, origin]
  )
    .then(result => {
      console.log(result)
      res.status(200).json({ status: 'success', msg: '密碼更新成功，請重新登入' })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ status: 'error', msg: '查無使用者，會員資料更新失敗' })
    })
})

// 讀取訂單
router.get('/:id/order', checkToken, async (req, res) => {
  const id = req.params.id
  const checkId = req.decode.id.toString()

  // 確認授權會員與請求取得的會員資料是否為同一人
  if (checkId !== id) {
    return res.json({ status: 'error', message: '會員資料存取失敗' })
  }


  const [data] = await db.execute(
    'SELECT * FROM `order` WHERE `user_id` = ?',
    [id]
  )

  const orderData = formatDate(data)

  // data.forEach((order) => {
  //   const formatDate = moment(order.create_at).format("YYYY-MM-DD HH:MM:SS")
  //   const formatOrder = { ...order, created_at: formatDate }
  //   orderData.push(formatOrder)
  // })

  if (orderData) {
    res.status(200).json({ status: 'success', orderData })
  } else {
    res.status(404).json({ status: 'error', msg: '查無資料' })
  }
})

// 讀取評論
router.get('/:id/common', checkToken, async (req, res) => {
  const id = req.params.id
  const checkId = req.decode.id.toString()

  // 確認授權會員與請求取得的會員資料是否為同一人
  if (checkId !== id) {
    return res.json({ status: 'error', message: '會員資料存取失敗' })
  }


  const [data] = await db.execute(
    'SELECT star.*, product.name AS product_name, product.img_top AS product_img_top, product.category AS product_category, product.id AS product_id, lesson.title AS lesson_title, lesson.img AS lesson_img FROM star JOIN product ON product.id = star.product_id  JOIN lesson ON lesson.id = star.lesson_id WHERE star.user_id = ?', [id]
  )

  const commonData = formatDate(data)
  
  if (data) {
    res.status(200).json({ status: 'success', commonData })
  } else {
    res.status(404).json({ status: 'error', msg: '查無資料' })
  }
})


function formatDate(data) {
  const formatData = []
  data.forEach((item) => {
    const formatDate = moment(item.create_at).format("YYYY-MM-DD HH:MM:SS")
    const formatItem = { ...item, created_at: formatDate }
    formatData.push(formatItem)
  })
  return formatData
}

export default router
