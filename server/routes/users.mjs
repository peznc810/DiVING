import express from 'express';
import multer from 'multer';
import cors from 'cors';
import db from '../db.mjs';
const router = express.Router();

// 引入.env檔
import 'dotenv/config.js'
const secretKey = process.env.SECRET_KEY;

// 許可進入的網址
const whitelist = [
	'http://127.0.0.1:5500',
  'http://localhost:3005',
  'http://localhost:3000',
  'http://127.0.0.1:5500/views/user.html',
	undefined,
];
const corsOptions = {
	credentials: true,
	origin(origin, callback) {
		if (whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('不允許傳遞資料'));
		}
	},
};


const app = express();
const upload = multer();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 登入
router.post('/login', upload.none(), async (req, res) => {
  // 接收client的require
  const { email, password } = req.body;
  console.log(email, password);
  // 比對db資料
  const [results] = await db.execute(
    'SELECT * FROM `users` WHERE `email` = ? AND `password` = ?',
    [email, password],
  );
  console.log(results)

  // const [result, felids] = await db.execute(
  // 	"SELECT * FROM `users`"
  // ).catch(err => {
  // 	console.log(err);
  // 	return [[], []];
  // });

  // console.log(result);

  res.json({msg:'Login Success'});

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
  return new Promise((resolve, reject) => {
    const { account, password } = req.body;
    // let result = db.data.user.find(u => u.account === account && u.password === password);
    // if (result) {
    //   resolve(result)
    // } else {
    //   reject({ status: "error", msg: "Invalid username or password" })
    // }
  });
}
export default router;
