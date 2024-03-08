import express from 'express';
import multer from 'multer';
import cors from 'cors';
const router = express.Router();

const upload = multer();
const secretKey = process.env.SECRET_KEY;

const whitelist = [
  'http://localhost:5500',
  'http://localhost:3000',
  'http://127.0.0.1:5500',
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
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send('會員API')
})


export default router;
