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
  
  res.send(result)
})


// 讀取資料
router.get('/:id',(req,res)=>{

})

export default router
