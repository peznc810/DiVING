import express from 'express';
import db from '../db.mjs';
import { v4 as uuidv4 } from 'uuid';
// import multer from 'multer';
// const path = 'path';
// const upload = multer({ storage: storage }); // 初始化 Multer
import { dirname, extname, resolve } from "path";
import { fileURLToPath } from "url";
import formidable from "formidable";
const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

// 定義處理 `/api/post` 請求的路由
  //讀取所有文章-list
  router.get('/', async (req, res) => {
  const { sort, searchText } = req.query; 
  // 排序用
  const orderDirection = sort === 'desc' ? 'DESC' : 'ASC'; // 根據排序方式設置排序方向
    try {
      // let queryString = `SELECT * FROM post`;
      // if (searchText) {
      //   queryString += ` WHERE title LIKE ? OR content LIKE ?`;
      //   queryParams = [`%${searchText}%`, `%${searchText}%`];
      // }
      // const [result, field] = await db.execute(queryString + ` ORDER BY published_at ${orderDirection}`, queryParams);

      let queryString = `SELECT * FROM post ORDER BY published_at ${orderDirection}`;
      let queryParams = [];
  
      if (searchText) {
        queryString += ` WHERE title LIKE ? OR content LIKE ?`;
        queryParams = [`%${searchText}%`, `%${searchText}%`];
      }

      const [result, field] = await db.execute('SELECT * FROM post WHERE title LIKE ? OR content LIKE ? ORDER BY published_at DESC', ['%' + searchText + '%', '%' + searchText + '%']);

      res.json(result);
    } catch (error) {
      console.error('Error executing database query:', error);
      res.status(500).json({ error: 'NOOOOOO' });  
    }
  });

    //讀取所有文章-dashboard
    router.get('/posts', async (req, res) => {
      try {
        const [result, field] = await db.execute('SELECT * FROM post');
  
        console.log(field);
        res.json(result);
      } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ error: 'NOOOOOO' });  
      }
    });

  //讀取動態文章
  router.get('/:pid', async (req, res) => {
    const postId = req.params.pid;

  try {
    const [result, _fields] = await db.execute('SELECT * FROM post WHERE id = ? ', [postId]);

    if(result.length === 1) {
        res.json(result[0]); //回傳單篇文章的數據
    }else{
        res.status(404).json({ error: '沒這篇啦'})
    }
  } catch (error) {
    console.error('Error executing database query:', error);
    res.status(500).json({ error: 'NOOOOOO' });    
  }
});
  //讀取登入使用者文章
  // router.get('/', async (req, res) => {
  //   try {
  //     const [result, field] = await db.execute('SELECT * FROM post');

  //     console.log(field);
  //     res.json(result);
  //   } catch (error) {
  //     console.error('Error executing database query:', error);
  //     res.status(500).json({ error: 'NOOOOOO' });  
  //   }
  // });

//dashboard 新增文章
router.post('/new', async (req, res) => {
  const { user_id, title, image, content, tags} = req.body;
  const id = uuidv4();
  const now = new Date();

  try {
    // const tagsValue = tags !== undefined ? tags : null;
    const [result] = await db.execute('INSERT INTO post (id, user_id, title, image, content, published_at, updated_at,tags , valid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
     [id, '戴夫', title, image, content, now, now, tags, 1]);   

        res.status(201).json({ status: 'success', message: '成功寫入'});
      // res.redirect('http://localhost:3000/dashboard/posts/');
  } catch (error) {
    console.error('Error executing database query:', error);
    
    res.status(500).json({ error: '寫失敗' });
  }
});

//dashboard 編輯文章
router.post('/edit', async (req, res) => {
  const { post_id, title, image, content, tags} = req.body;
  const now = new Date();

  try {
    const [result] = await db.execute('UPDATE post SET title=?, image=?, content=?, updated_at=?, tags=? WHERE id=?', 
     [title, image, content, now, tags, post_id]);

     if (result.affectedRows > 0) {
    res.status(200).json({ status: 'success', message: '成功更新'});
    } else {
      res.status(404).json({ error: '找不到要更新的資料' });
    }
  } catch (error) {
    console.error('Error executing database query:', error);
    
    res.status(500).json({ error: '更新失敗' });
  }
});

router.post("/disable/:postId", async(req,res) =>{
  const post_id = req.params.postId
  try{
    const [result] = await db.execute('UPDATE post SET valid = 0 WHERE id = ?', 
     [post_id]);

     res.status(200).json({ message: 'Post disabled successfully' });
  } catch{
    console.error('Error disabling post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post("/test", async(req, res) => {
  const {name, title} = req.body;
  const id = uuidv4();

  try {
    // Using prepared statement to handle the parameter
    const [result] = await db.execute('INSERT INTO test (id, name, title) VALUES (?, ?, ?)', [id, name, title]);

    console.log(`Inserted UUID: ${id}`);

    res.status(200).json({ status: 'success', message: '成功寫入', insertedUUID: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
})

// --BEN--

router.post("/upload", (req, res, next) => { //ESline 嚴格 => 要空格
  const form = formidable({
      uploadDir: resolve(__dirname, "public/upload"), //路徑
      keepExtensions: true //保留副檔名
  }); //也有很多設定所以用物件的方式來設定參數

  form.parse(req, (error, fields, files) => { //()裡面 錯誤 欄位 檔案
      if (error) {
          next(); //把錯誤往下傳
          return false;
      }
      res.json({ fields, files }) //不曉得有什麼格式 所以直接列出來
  })
});

export default router;
