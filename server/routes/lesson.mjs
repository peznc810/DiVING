import express from 'express'
import multer from 'multer'
import db from '../db.mjs'
import jwt from 'jsonwebtoken'
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
    res.json(lesson)
  })()
})

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
    res.json(lesson)
  })()
})

//get star

router.get('/getstar/:id', function (req, res, next) {
  (async () => {
    const Sid = req.params.id
    let [star] = await db
      .execute(
        'SELECT id,score ,comment FROM star WHERE lesson_id = ? ',
        [Sid],
      )
      .catch((err) => {
        console.error(err)
        return [undefined]
      })
    res.json(star)
  })()
})

router.post('/fav/:id', async (req, res) => {
  const newFav = req.body.fav
  const id = req.params.id
  try {
    // 使用 SQL 語法來更新資料庫中的狀態
    const result = await db.execute(
      'UPDATE fav SET state = ? WHERE lesson_id = ?',
      [newFav, id],
    )
    res.json({ state: newFav })
  } catch (err) {
    console.error('Error executing query', err.stack)
    res.status(500).json({ error: 'Internal server error' })
  }
  // console.log(newFav)
})

// get fav
router.get('/getfav/:id', function (req, res, next) {
    (async () => {
        const Sid = req.params.id
        const userState = req.query.userState
        let [star] = await db
        .execute('SELECT fav.state FROM fav WHERE fav.user_id = ? AND fav.lesson_id = ?', [userState, Sid])
        .catch((err) => {
            console.error(err)
            return [undefined]
        })
        if (star && star.length > 0) {
            const newFavState = star[0];
            console.log(newFavState);
            if (newFavState) {
                console.log(newFavState.state)
                res.json(newFavState.state)
            } else {
                res.json(null)
            }
        } else {
            res.json(null)
        }
    })();
});

// Google註冊

// 確認token資料

export default router
