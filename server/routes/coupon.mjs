import express, { query } from 'express'
import connection from '../db.mjs'

const router = express.Router()


//在首頁取得coupon2資訊
router.get('/', async (req, res) => {
    // [[coupon]] 雙重解構賦值 => [{}] => {}
    const [[coupon]] = await connection
      .execute('SELECT * FROM `coupon` WHERE `id` = 2 ')
      .catch(() => {
        return [undefined]
      })
    // 產生亂碼
    const couponCode = generateRandomCode(6)
    // 把亂碼放進coupon裏面
    await connection.execute('UPDATE `coupon` SET `code` = ? WHERE `id` = 2', [
      couponCode,
    ])
  
    res.send(coupon)
  })

// 讀取使用者所有的優惠卷
router.get('/:id', async (req, res) => {
  // 判斷是否登入，並取得登入者資訊
  const userToken = req.headers
  const userID = req.params.id
    console.log(userID);
  if (!userToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const [userCoupons] = await connection.execute(
      'SELECT coupon_has.* , coupon.name AS coupon_name FROM coupon_has JOIN coupon ON coupon.id = coupon_has.coupon_id WHERE coupon_has.user_id = ?',
      [userID],
    )

    console.log(userCoupons)
    res.status(200).json( userCoupons )
    
  } catch (error) {
    console.error('Error fetching user coupons:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// 領取優惠碼
router.post('/', async (req, res) => {
    let inputCode = req.body.code
    const [[couponCode]] = await connection.execute(
        "SELECT * FROM `coupon` WHERE `id`=? AND `code` = ?",
        [id, code]
    )
    if(inputCode === couponCode){
        res.json()
    }
})

// 使用優惠卷
router.put('/', async (req, res) => {
    
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
