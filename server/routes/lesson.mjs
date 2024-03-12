import express from 'express'
import multer from 'multer'
import db from '../db.mjs'
import jwt from "jsonwebtoken"
const router = express.Router()

// 引入.env檔
import 'dotenv/config.js'
const secretKey = process.env.SECRET_KEY

const app = express()
const upload = multer()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// get list
router.get('/d/:date', function (req, res, next) {
    (async () => {
     
        
        let [sort] = await db.execute("SELECT * FROM `sort`").catch(() => {
            return [undefined];
        })

        let [dateData] = await db.execute(
            "SELECT * FROM `expense` WHERE `date` = ?",
            [date]
        );
        if (sort && dateData) {
            res.render("index", { date, sort, dateData });
            // console.log(sort);
        } else {
            res.send("錯誤")
        };
    })();

});

// 登出


// 常駐登入狀態


// 註冊


// Google註冊



// 確認token資料


export default router
