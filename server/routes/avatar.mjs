import express from 'express'
import multer from 'multer'
import db from '../db.mjs'
import { readFile } from 'fs'
import { join,extname } from 'path'

// middlewares
import checkToken from '../middlewares/checkToken.mjs'

const router = express.Router()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 把收到的檔案移動到public
// https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
const storage = multer.diskStorage({
  // 存放檔案的位置
  destination: function (req, file, cb) {
    cb(null, 'public/avatar')
  },
  // 時間戳命名
  filename: function (req, file, cb) {
    cb(null, Date.now() + extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
// const upload = multer()

// 更新avatar
router.post('/upload', checkToken, upload.single('avatar'), async (req, res) => {
  const uid = req.decode.id
  const fileName = req.file.filename
  
  // 把檔案名稱上傳到db
  await db.execute(
    'UPDATE `users` SET `avatar` = ? WHERE `uid` = ?',
    [fileName, uid]
  )
    .then(
      res.status(200).json({ status: 'success', msg: '更新成功', avatar: fileName })
      )
    .catch(err => {
      console.log(err)
      res.status(400).json({ status: 'error', msg: '查無使用者，更新失敗' })
    })
})


export default router
