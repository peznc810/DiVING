import express from 'express';
import db from '../db.mjs';
const router = express.Router();
import 'dotenv/config.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    let coupon, error
    // 把成功和失敗的物件放入全域物件
    await userLogin(req).then(result => {
        coupon = result;
    }).catch(err => {
      error = err
    })
    if (error) {
      res.status(400).json(error)
    }
    if (coupon) {
      res.status(200).json({ msg: '登入成功', coupon })
    }
  })

  function userLogin(req) {
    return new Promise(async (resolve, reject) => {
      const [[result]] = await db.execute(
        'SELECT * FROM `coupon`'
      );
      if (result) {
        resolve(result)
      } else {
        reject({ status: "error", msg: "帳號密碼錯誤" })
      }
    })
  }