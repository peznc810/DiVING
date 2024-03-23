import express from 'express'
import connection from '../db.mjs'

const router = express.Router() //組織和管理路由

// 讀取資料
router.get('/', async (req, res) => {
  // 連接資料庫
  const [result] = await connection
    .execute('SELECT * FROM `event`')
    .catch(() => {
      return [undefined]
    })
  // console.log(result);
  res.json(result)
})


// 讀取資料
router.get('/:id',async (req,res)=>{
  const eid = req.params.id
  const [[result]] = await connection.execute(
    "SELECT * FROM `event` WHERE id =?",
    [eid]
  ) .catch(() => {
    return [undefined]
  })
  res.status(200).json(result)
  console.log(result);
})

export default router
