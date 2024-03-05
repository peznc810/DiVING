import express from 'express';
import moment from 'moment';
import db from '../db.mjs';
import multer from 'multer';

const router = express.Router();
const upload = multer();


router.get('/', (req, res, next) => {
    // 取得日期、設定格式
    let time = moment().format("YYYY-MM-DD");
    //   res.send('導向有今天日期的網址');
    res.redirect("/expense/d/" + time);
});

// 讀取
router.get('/d/:date', async (req, res, next) => {
    (async () => {
        // res.send("讀取指定日期的所有消費")
        // 取得url參數中的date
        let date = req.params.date;
        // 讀取分類
        // let sort = await getSort().then((data) => {
        //   return data.sort;
        // }).catch((err) => {
        //   return undefined;
        // });
        let [sort] = await db.execute("SELECT * FROM `sort`").catch(() => {
            return [undefined];
        })

        //   // 讀取消費日期
        // let dateData = await getDateData(date).then((data) => {
        //   return data.result;
        // }).catch((err) => { });
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

// 新增
router.post('/', async (req, res, next) => {
    // res.send('新增指定日期的消費');
    let title = req.body.title;
    let money = parseInt(req.body.money);
    let sort = parseInt(req.body.sort);
    let date = req.body.date;
    console.log(req.body);
    await db.execute(
        "INSERT INTO `expense` (`id`, `title`, `sort`, `money`, `date`) VALUES (NULL, ?, ?, ?, ?);", [title, sort, money, date]
    ).then(() => {
        res.redirect("/expense/d/" + date);
    }).catch(() => {
        res.send("錯誤")
    })
});

// 修改
router.put('/', upload.none(), async (req, res, next) => {
    // res.send('修改指定日期的消費');
    let title = req.body.title;
    let money = parseInt(req.body.money, 10);
    let sort = parseInt(req.body.sort, 10);
    let id = parseInt(req.body.id);
    let date = req.body.date;
    let newList = await db.execute(
        "UPDATE `expense` SET `title` = ?, `sort` = ?, `money` = ?, `date` = ? WHERE `expense`.`id` = ?;",
        [title, sort, money, date, id]
    )
        .then(() => {
            return 1;
        })
        .catch(() => {
            return 0;
        })
    res.json({ newList });
});

// 刪除
router.delete('/', upload.none(), async (req, res, next) => {
    let id = parseInt(req.body.id, 10);
    let deleteList = await db.execute(
        "DELETE FROM expense WHERE `expense`.`id` = ?;",
        [id]
    ).then(() => {
        return 1;
    }).catch(() => {
        return 0;
    })
    res.json({ deleteList })
});


export default router;
