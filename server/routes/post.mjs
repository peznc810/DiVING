import express from 'express';
import db from '../db.mjs'; // 修改路徑以匹配你的實際結構

const router = express.Router();

// 定義處理 `/api/post` GET 請求的路由

router.get('/', async (req, res) => {
    try {
      const [rows, _fields] = await db.execute('SELECT * FROM post');
      res.json(rows);
    } catch (error) {
      console.error('Error executing database query:', error);
      res.status(500).json({ error: 'NOOOOOO' });    
    }
  });

  router.get('/:pid', async (req, res) => {
    const postId = req.params.pid;

  try {
    const [rows, _fields] = await db.execute('SELECT * FROM post WHERE id = ? ', [postId]);

    if(rows.length === 1) {
        res.json(rows[0]); //回傳單篇文章的數據
    }else{
        res.status(404).json({ error: '沒這篇啦'})
    }
  } catch (error) {
    console.error('Error executing database query:', error);
    res.status(500).json({ error: 'NOOOOOO' });    
  }
});

export default router;
