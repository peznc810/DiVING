import express from 'express'
import connection from '../db.mjs'

const router = express.Router() //組織和管理路由
const app = express() //配置和啟動整個應用程式

app.use(express.json())
app.use(express.urlencoded({ extended: true })) //配置應用程式使用 Express 內建的 URL 編碼解析器

router.get('/', async (req, res) => {
  // 連接資料庫
 const [result] = await connection.execute(
    'SELECT * FROM `event`');

res.send(result)
})

export default router
