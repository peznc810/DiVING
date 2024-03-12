import express from 'express';
import db from '../db.mjs';

const router = express.Router();

  //讀取所有資料
  router.get('/', async (req, res) => {
    try {
        // 取得 map 表格的資料
        const [mapResult, mapField] = await db.execute('SELECT * FROM map');
        const mapData = mapResult;
        console.log(mapField);
    
        // 取得 map_about 表格的資料
        const [aboutResult, aboutField] = await db.execute('SELECT * FROM map_about');
        const aboutData = aboutResult;
        console.log(aboutField);

    //   res.json(result);
    res.json({ mapData, aboutData });
    } catch (error) {
      console.error('Error executing database query:', error);
      res.status(500).json({ error: 'NOOOOOO' });  
    }
  });


export default router;
