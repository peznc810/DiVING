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
let user

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
  // 先放入全域變數，因為status會需要
  user = userData
  if (user) {
    let token = jwt.sign({
      email: user.email,
      name: user.name,
      tel: user.phone
    }, secretKey, { expiresIn: '10m' })
    res.status(200).json({ msg: '登入成功', token })
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
  // 如果沒有在名中，把目前的登出token放入名單中
  blackList.push(token)
  // 初始化token
  token = jwt.sign({
    email: '',
    name: '',
    tel: ''
  }, secretKey, { expiresIn: '-10s' })
  res.status(200).json({
    msg: '登出成功',
    token
  })
})

// 常駐登入狀態
router.post('/status', checkToken, (req, res) => {
  // 可能不止這裡需要解譯過的資料，所以放到checkToken共用
  if (user.email === req.decode.email) {
    // 重新核發token，前台需重新設置localStorage
    let token = jwt.sign({
      email: user.email,
      name: user.name,
      tel: user.phone
    }, secretKey, { expiresIn: '10m' })
    res.status(200).json({
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
router.get('/', (req, res) => {
  res.send('會員login')
})



// 確認token資料
function checkToken(req, res, next) {
  let token = req.get('Authorization')
  // console.log(token);
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
    jwt.verify(token, secretKey, (err, decode) => {
      if (err) {
        return res.status(401).json({
          status: 'error',
          msg: '驗證失敗，請重新登入'
        })
      } else {
        // 把解譯過的資料放入req中讓其他狀態可以共用
        req.decode = decode
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
