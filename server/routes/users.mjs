import express from 'express'
import multer from 'multer'
import db from '../db.mjs'
import jwt from "jsonwebtoken"
const router = express.Router()

// 引入.env檔
import 'dotenv/config.js'
const secretKey = process.env.SECRET_KEY

const app = express()
const upload = multer()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// checkToken跟logout需要
const blackList = []
// let user

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
      userEmail: userData.email,
      userName: userData.name,
      tel: userData.phone
    }, secretKey, { expiresIn: '1d' })
    res.status(200).json({ status: 'success', msg: '登入成功', token })
  } else {
    res.status(401).json({
      status: "error",
      msg: "帳號或密碼錯誤",
    })
  }
})

// Google登入
router.post('/google-login', async (req, res) => {
  // 接收client的require
  const { email, uid } = req.body
  // 比對db資料
  // 如果比對成功回傳資料，如果失敗則回傳錯誤訊息
  const [[userData]] = await db.execute(
    'SELECT * FROM `users` WHERE `email` = ? AND `googleUID` = ?',
    [email, uid]
  )
  if (userData) {
    let token = jwt.sign({
      userEmail: userData.email,
      userName: userData.name,
      tel: userData.phone,
      avatar: userData.avatar
    }, secretKey, { expiresIn: '1d' })
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
  blackList.push(token)
  // 初始化token
  token = jwt.sign({
    email: '',
    name: '',
    tel: ''
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
      userEmail: userData.email,
      userName: userData.name,
      tel: userData.phone
    }, secretKey, { expiresIn: '10m' })
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
      msg: 'Email已註冊'
    })
    return false
  }
  await db.execute(
    "INSERT INTO `users` (`email`, `password`, `name`) VALUES (?, ?, ?);", [userEmail, userPWD, userName]
  )
    .then(() => {
      res.status(200).json({ status: 'success',msg: '註冊成功' })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ status: 'error', msg: '註冊失敗，請再試一次' })
    })
})

// Google註冊
router.post('/google-register', async (req, res) => {
  console.log(req.body)
  const { displayName, email, photoURL, uid } = req.body
  const [[userData]] = await db.execute(
    'SELECT * FROM `users` WHERE `googleUID` = ?',
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
    "INSERT INTO `users` (`name`, `email`, `avatar`, `googleUID`) VALUES (?, ?, ?, ?);", [displayName, email, photoURL, uid]
  )
    .then(() => {
      res.status(200).json({ status: 'success',msg: '註冊成功' })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ status: 'error', msg: '註冊失敗，請再試一次' })
    })
})


// 確認token資料
function checkToken(req, res, next) {
  let token = req.get('Authorization')
  // 是否有token
  if (token && token.indexOf('Bearer ') === 0) {

    // 如果條件符合，取出token
    token = token.slice(7)
    // 檢查是否在已登出的名單中
    if (blackList.includes(token)) {
      res.status(401).json({ status: 'error', msg: '登入驗證已失效，請重新登入' })
      // 結束整個middleware
      return false
    }
    // 前台傳留存的token進來，要確認token是否過期
    jwt.verify(token, secretKey, (err, decode) => {
      if (err) {
        return res.status(401).json({
          status: 'error',
          msg: '驗證已失效，請重新登入'
        })
      } else {
        // 把解譯過的資料放入req中讓其他狀態可以共用
        req.decode = decode
        // 如果尚未過期就繼續執行
        next()
      }
    })
  } else {
    // 沒有token
    res.status(401).json({
      status: 'error',
      msg: '查無此驗證資料'
    })
    // return false
  }
}

export default router
