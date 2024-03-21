import express from 'express';
import db from '../db.mjs';
import { v4 as uuidv4 } from 'uuid';
import fileUpload from 'express-fileupload';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const app = express();

  //讀取所有文章-list
  router.get('/', async (req, res) => {
  const { sort, searchText } = req.query; 
  // 排序用
   // 檢查 sort 參數的值，如果是 'asc' 則改變排序方式為升冪

    try {
      const [result, field] = await db.execute(`SELECT post.id as post_id, post.*, users.id as user_id, users.name FROM post JOIN users ON post.user_id = users.id WHERE title LIKE ? OR content LIKE ? ORDER BY published_at DESC`, ['%' + searchText + '%', '%' + searchText + '%']);

      res.json(result);
    } catch (error) {
      console.error('Error executing database query:', error);
      res.status(500).json({ error: 'NOOOOOO' });  
    }
  });

   //讀取所有文章-dashboard
  router.get('/posts/:userId', async (req, res) => {
    const userId = req.query.userId
    console.log(userId);
    
    try {
      //抓出post.id 避免被userId覆寫 
      const [result] = await db.execute( 'SELECT post.id as post_id, post.*, users.id as user_id, users.name FROM post JOIN users ON post.user_id = users.id WHERE post.user_id = ? AND post.valid = ?',[userId, 1]);
      
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
      const [result, _fields] = await db.execute('SELECT post.id as post_id, post.*, users.id as user_id, users.name FROM post JOIN users ON post.user_id = users.id WHERE post.id = ? ', [postId]);

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

//圖片上傳
app.use(fileUpload({
  createParentPath: true,
  // limits: { fileSize: 50 * 1024 * 1024 } 
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 // 4.16.0 或以上body-parser已被內建

// 當瀏覽器請求/upload時 Express查找對應文件 提供給client端靜態引用
// app.use('/upload', express.static('upload'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload'); // 儲存的路徑
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const fileName = uniqueName + extension; // 重新命名文件

    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

//dashboard 新增文章
router.post('/new', upload.single('images') , async (req, res) => {
  const {user_id,title, content, tags} = req.body;
  const id = uuidv4();
  const now = new Date();
  const image = req.file.filename; 

  try {
    await db.execute('INSERT INTO post (id, user_id, title, image, content, published_at, updated_at,tags , valid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
     [id, user_id, title, image, content, now, now, tags, 1]);

      res.status(201).json({ status: 'success', message: '成功寫入'});
  } catch (error) {
    console.error('Error executing database query:', error);
    
    res.status(500).json({ error: '寫失敗' });
  }
});

//dashboard 編輯文章
router.post('/edit/:id', async (req, res) => {
  const post_id = req.params.id;
  const { title, image, content, tags} = req.body;
  const now = new Date();

  try {
    const [result] = await db.execute('UPDATE post SET title=?, image=?, content=?, updated_at=?, tags=? WHERE id=?', 
     [title, image, content, now, tags, post_id]);

     if (result.affectedRows > 0) {
    res.status(201).json({ status: 'success', message: '成功更新'});
    } else {
      res.status(404).json({ error: '找不到要更新的資料' });
    }
  } catch (error) {
    console.error('Error executing database query:', error);
    
    res.status(500).json({ error: '更新失敗' });
  }
});

//軟刪除文章
router.post("/disable/:postId", async(req,res) =>{
  const post_id = req.params.postId;

  try{
    await db.execute('UPDATE post SET valid = 0 WHERE id = ?', 
     [post_id]);

     res.status(200).json({ message: 'Post disabled successfully' });
  } catch{
    console.error('刪除失敗:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

export default router;
