import express from 'express'
import transporter from '../configs/email.mjs'
import db from '../db.mjs'
import multer from 'multer'
import 'dotenv/config.js'

const router = express.Router()
const update = multer()

/* 寄送email的路由 */
router.post('/send', update.none(), async (req, res, next) => {
  const { userEmail } = req.body
  const [[userData]] = await db.execute(
    'SELECT * FROM `users` WHERE `email` = ?', [userEmail]
  )
  if (userData) {
    // email內容
    const mailOptions = {
      from: `"support"<${process.env.SMTP_TO_EMAIL}>`,
      to: userData.email,
      subject: '這是一封測試電子郵件',
      text: `你好， \r\n通知你有關第一封郵件的事。\r\n\r\n敬上\r\n開發團隊`,
    }
    // 寄送
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        // 失敗處理
        return res.status(400).json({ status: 'error', msg: err })
      } else {
        // 成功回覆的json
        return res.json({ status: 'success', data: null })
      }
    })
  } else {
    return res.status(401).json({ status: 'error', msg: '查無此信箱，請再輸入一次' })
  }
})

export default router
