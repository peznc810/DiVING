import express from 'express'
import connection from '../db.mjs'
import multer from 'multer'

const router = express.Router()
const update = multer()

//在首頁取得coupon5資訊
router.get('/', async (req, res) => {
  // 產生亂碼
  const couponCode = generateRandomCode(6)
  // 把亂碼放進coupon裏面
  await connection.execute('UPDATE `coupon` SET `code` = ? WHERE `id` = 2', [
    couponCode,
  ])
  // [[coupon]] 雙重解構賦值 => [{}] => {}
  const [[coupon]] = await connection
    .execute('SELECT * FROM `coupon` WHERE `id` = 5 ')
    .catch(() => {
      return [undefined]
    })
  // console.log(coupon);
  res.json(coupon)
})

// 讀取使用者所有的優惠卷
router.get('/:id', async (req, res) => {
  // 判斷是否登入，並取得登入者資訊
  const userToken = req.headers
  const userID = req.params.id
  console.log(userID)
  if (!userToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const [userCoupons] = await connection.execute(
      'SELECT coupon_has.* , coupon.name AS coupon_name,coupon.sort AS coupon_sort ,coupon.discount AS coupon_discount, coupon.rule AS coupon_rule, coupon.rule_content AS coupon_rule_content FROM coupon_has JOIN coupon ON coupon.id = coupon_has.coupon_id WHERE coupon_has.user_id = ?',
      [userID],
    )

    // console.log(userCoupons)
    res.status(200).json(userCoupons)
  } catch (error) {
    console.error('Error fetching user coupons:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// 領取優惠碼
router.post('/', async (req, res) => {
 
  /* 1. 如果是用表單形式 => 要用update.none()解譯，前端要用append把id放進去
  2. 如直接使用json物件傳到後端，放進去後要toString*/
  try {
    // 前端送進來inputCode, authID，因為是物件，名字要跟前端一樣
    // 從input拿取優惠碼，找到相對的優惠卷
    let { inputCode, authID } = req.body 
    // console.log(inputCode)
    const [[couponCode]] = await connection.execute(
      'SELECT * FROM `coupon` WHERE `code` = ?',
      [inputCode],
    )
      console.log(couponCode);
    // 如果輸入優惠碼正確
    if (inputCode === couponCode.code) {
      // 判斷是否已領取過
      const [existingCoupon] = await connection.execute(
        'SELECT * FROM `coupon_has` WHERE `coupon_id`=? AND `user_id`=?',
        [couponCode.id, authID],
      )
        // console.log(existingCoupon);
      if (existingCoupon.length > 0) {
        res.json({status:"existed"})
      } else {
        await connection.execute(
          'INSERT INTO `coupon_has` (`coupon_id`, `user_id`, valid) VALUES (?, ?,1)',
          [couponCode.id, authID],
        )
        .then(()=>res.status(200).json({status:"success"}))
        .catch(()=> res.status(401).json({status:"error"}))
      }
    }else if (couponCode === undefined){
      res.status(401).json({status:"fail"})
    }
  } catch (error) {
    res.json({ msg: '領取失敗' })
  }
})

// 使用優惠卷
router.put('/', async (req, res) => {
  let { userID, couponID } = req.body
  await connection.execute(
    "UPDATE `coupon_has` SET `valid` = 0 WHERE coupon_id = ? AND user_id=?",
    [couponID, userID]
  )
  .then(()=>{
    res.json({ msg: '更新成功' })
  })
  .catch(()=>{
    res.status(500).json({ msg: '更新失敗' })
  })
})

// ----------------------

// 產生指定長度的隨機字串
function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXY0123456789'
  let randomCode = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomCode += characters.charAt(randomIndex)
  }

  return randomCode
}

export default router
