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
router.get('/getlist', function (req, res, next) {
    (async () => {
        let [lesson] = await db
        .execute('SELECT * FROM `lesson`')
        .catch(() => [undefined])
        res.send(lesson)
    })();

});

// get id
router.get('/getlist/:id', function (req, res, next) {
    (async () => {
        const lid = req.params.id
        let [lesson] = await db
        .execute('SELECT * FROM `lesson` WHERE id = ?', [lid])
        .catch((err) => {
            console.error(err)
            return [undefined]
        })
        res.send(lesson)
    })();
});

//get star

router.get('/getstar/:id', function (req, res, next) {
    (async () => {
        const Sid = req.params.id
        let [star] = await db
        .execute('SELECT lesson.title, star.score FROM lesson INNER JOIN star ON lesson.id = ? AND star.lesson_id = ?', [Sid, Sid])
        .catch((err) => {
            console.error(err)
            return [undefined]
        })
        res.send(star)
    })();
});


// 註冊


// Google註冊



// 確認token資料


export default router
