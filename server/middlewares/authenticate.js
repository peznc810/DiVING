import jsonwebtoken from 'jsonwebtoken'

// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 獲得加密用字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

// 中介軟體middleware，用於檢查授權(authenticate)
export default function authenticate(req, res, next) {
  // const token = req.headers['authorization']
  // const token = req.cookies.accessToken
  // console.log(token)
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJoZXJyeSIsImdvb2dsZV91aWQiOm51bGwsImxpbmVfdWlkIjpudWxsLCJpYXQiOjE3MDkyNjAyMDAsImV4cCI6MTcwOTUxOTQwMH0.eLaK0JQb65D1qt8jW0WJx3fNladkh5qFeWQfoisV6Ts'
  // if no token
  if (!token) {
    return res.json({
      status: 'error',
      message: '授權失敗，沒有存取令牌',
    })
  }

  // verify的callback會帶有decoded payload(解密後的有效資料)，就是user的資料
  jsonwebtoken.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.json({
        status: 'error',
        message: '不合法的存取令牌',
      })
    }

    // 將user資料加到req中
    req.user = user
    next()
  })
}
