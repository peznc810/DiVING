import express from 'express';
import db from '../db.mjs';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
const upload = multer();

const router = express.Router();

// 定義處理 `/api/post` 請求的路由
  //讀取所有文章
  router.get('/', async (req, res) => {
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
router.post('/new', upload.none(), async (req, res) => {
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

//編輯文章的更新
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


export default router;
