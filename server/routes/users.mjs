import express from 'express';
import multer from 'multer';
import db from '../db.mjs';
import jwt from "jsonwebtoken";
const router = express.Router();

// 引入.env檔
import 'dotenv/config.js'
const secretKey = process.env.SECRET_KEY;

const app = express();
const upload = multer();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 登入
router.post('/login', upload.none(), async (req, res) => {
  let user, error
  // 把成功和失敗的物件放入全域物件
  await userLogin(req).then(result => {
    user = result;
  }).catch(err => {
    error = err
  })
  if (error) {
    res.status(400).json(error)
  }
  if (user) {
    // 寫入session
    // req.session.user = user;
    // 寫入token
    const token = jwt.sign({
      email: user.email,
      name: user.name,
      tel: user.phone
    }, secretKey, { expiresIn: '30m' })
    res.status(200).json({ msg: '登入成功', token })
  }
})

// 登出
router.get('/', (req, res) => {
  res.send('會員API')
})

// 註冊
router.get('/', (req, res) => {
  res.send('會員login')
})

// 讀取單一使用者
router.get('/', (req, res) => {
  res.send('會員API')
})



// 登入用
function userLogin(req) {
  return new Promise(async (resolve, reject) => {
    // 接收client的require
    const { userEmail, userPWD } = req.body;
    // console.log(email, password);
    // 比對db資料
    // 如果比對成功回傳資料，如果失敗則回傳錯誤訊息
    const [[result]] = await db.execute(
      'SELECT * FROM `users` WHERE `email` = ?',
      [userEmail]
    );
    if (result.password === userPWD) {
      const { password, ...user } = result
      resolve(user)
    } else {
      reject({ status: "error", msg: "帳號密碼錯誤" })
    }
  })
}

export default router;
