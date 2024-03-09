import express from 'express'
import connection from '../db.mjs'

const router = express.Router()


router.get('/:id', async (req, res) => {
  // 前端傳來使用者是否登入
  const id = req.params
// [[coupon]] 雙重解構賦值 => [{}] => {}
  const [[coupon]] = await connection
    .execute('SELECT * FROM `coupon` WHERE `id` =2')
    .catch(() => {
      return [undefined]
    })
    console.log(coupon);
  // 判斷使用者是否有登入，沒有登入顯示優惠卷資訊
  if (!id) {
    res.redirect('/')
  }else{
    // 產生亂碼
    const couponCode = generateRandomCode(6)
    // 把亂碼放進coupon裏面
    await connection.execute(
        'UPDATE `coupon` SET `code` = ? WHERE `id` = 2',
        [couponCode]
        )
  }
  res.json(coupon)
})

// 領取優惠碼
// router.post('/', async (req, res) => {
//   let userID = req.params // 從路由抓登入的id => 就會有資料
//   // 取出使用者有的coupon
//   let hasCouponID = await connection.execute(
//     'SELECT `coupon_has`.* , coupon.name AS `coupon_name` FROM `coupon_has` JOIN coupon ON coupon.id = coupon_has.coupon_id WHERE coupon_has.user_id = ?}',
//     [userID],
//   )

//   if (hasCouponID === 1) {
//     res.send('已領取過')
//   } else {
//     await connection
//       .execute(
//         ' INSERT INTO `coupon` (`id`, `name`, `code`,`sort`, `discount`, `rule`,`valid`) VALUES (1, "新客首次下單享折扣100元", "NEW100", "全站優惠" , 100,200,1)',
//       )
//       .then(() => {
//         res.redirect('/home')
//       })
//       .catch(() => {
//         return [undefined]
//       })
//   }
// })


// 使用優惠卷

// ----------------------

// 產生指定長度的隨機字串
function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXY0123456789';
    let randomCode = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters.charAt(randomIndex);
    }
  
    return randomCode;
  }


export default router
