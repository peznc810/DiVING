import express from 'express';
import db from '../db.mjs';

const router = express.Router();

// 定義處理 `/api/post` 請求的路由
  //讀取所有文章
  router.get('/', async (req, res) => {
    try {
    //   const [result, field] = await db.execute(`     SELECT map.*, map_about.*
    //   FROM map
    //   OUTER JOIN map_about 
    //   ON map.id = map_about.map_id`);
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
