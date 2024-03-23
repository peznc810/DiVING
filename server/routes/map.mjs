import express from 'express';
import db from '../db.mjs';

const router = express.Router();

  //讀取所有資料
  router.get('/', async (req, res) => {
    try {
        // 取得 map 表格的資料
        const [mapResult] = await db.execute('SELECT * FROM map');
        const mapData = mapResult;
    
        // 取得 map_about 表格的資料
        const [aboutResult] = await db.execute('SELECT * FROM map_about');
        const aboutData = aboutResult;

    res.json({ mapData, aboutData });
    } catch (error) {
      console.error('Error executing database query:', );
      res.status(500).json({ error: error });  
    }
  });

export default router;
