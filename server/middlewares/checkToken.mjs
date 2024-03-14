import jwt from "jsonwebtoken"
// 存取`.env`設定檔案使用
import 'dotenv/config.js'
// 獲得加密用字串
const secretKey = process.env.SECRET_KEY

// checkToken跟logout需要
const blackList = []

// 中介軟體middleware，用於檢查Token授權(authenticate)
export default function checkToken(req, res, next) {
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
  }
}
