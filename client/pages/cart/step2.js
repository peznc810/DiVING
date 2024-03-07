import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import CartStep from '@/components/cart/cart-step'
import AutoTab from '@/components/cart/test'
import userData from '@/data/cart/user.json'

import { useRouter } from 'next/router'

const user_id = '1'
const [cUser] = userData.filter((v) => {
  return v.user_id === user_id
})

export default function Home() {
  const router = useRouter()

  const [order, setOrder] = useState({})
  const [cartData, setCartData] = useState(null)
  const [userInputs, setUserInputs] = useState({
    user_name: '',
    user_phone: '',
    user_city: '',
    user_section: '',
    user_road: '',
    cCard_name: '',
    cCard_address: '',
    order_note: '',
  })
  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  })
  const [isLoading, setIsLoading] = useState(true)

  let totalPrice = 0

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    setCartData(data)
  }, [])

  useEffect(() => {
    if (router.isReady) {
      // 這裡確保能得到router.query值
      console.log(router.query)
      // http://localhost:3000/order?transactionId=2022112800733496610&orderId=da3b7389-1525-40e0-a139-52ff02a350a8
      // 這裡要得到交易id，處理伺服器通知line pay已確認付款，為必要流程
      // TODO: 除非為不需登入的交易，為提高安全性應檢查是否為會員登入狀態
      const { transactionId, orderId } = router.query
      console.log('1111')

      // 如果沒有帶transactionId或orderId時，導向至首頁(或其它頁)
      if (!transactionId || !orderId) {
        // 關閉載入狀態
        setIsLoading(false)
        // 不繼續處理
        return
      }
      console.log('2222')

      // 向server發送確認交易api
      handleConfirm(transactionId)
      console.log('3333')
    }

    // eslint-disable-next-line
  }, [router.isReady])

  const t1Change = () => {
    setUserInputs((prevState) => ({
      ...prevState,
      user_name: cUser.name,
      user_phone: cUser.phone,
      user_city: cUser.address.split(',')[0],
      user_section: cUser.address.split(',')[1],
      user_road: cUser.address.split(',')[2],
    }))
  }

  const t2Change = () => {
    setUserInputs((prevState) => ({
      ...prevState,
      cCard_name: cUser.name,
      cCard_address: cUser.address,
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const checkFormat = () => {
    return true

    // const phone = document.querySelector('.user_phone').value
    // const user_name = document.querySelector('.user_name').value
    // const cCard_name = document.querySelector('.cCard_name').value

    // let emptyInput

    // const phoneRegex = /^09\d{8}$/
    // const chineseRegex = /^[\u4e00-\u9fa5]+$/

    // const inputs = document.querySelectorAll('input[type=text]')

    // inputs.forEach((input) => {
    //   if (!input.value) {
    //     emptyInput = '有地方尚未填寫'
    //   }
    // })

    // if (emptyInput) {
    //   notify(emptyInput)
    //   return false
    // }

    // function checkCorr(value, regex, errMsg) {
    //   if (!regex.test(value)) {
    //     notify(errMsg)
    //     return false
    //   }
    //   return true
    // }

    // if (!checkCorr(phone, phoneRegex, '收件人電話 格式錯誤')) {
    //   return false
    // }

    // if (!checkCorr(user_name, chineseRegex, '收件人名稱 格式錯誤')) {
    //   return false
    // }

    // if (!checkCorr(cCard_name, chineseRegex, '持卡人姓名 格式錯誤')) {
    //   return false
    // }

    // return true
  }

  const handleSub = (e) => {
    e.preventDefault()
    if (checkFormat()) {
      const products = []
      cartData.forEach((data) => {
        products.push({
          id: data.product_id || data.lesson_id,
          name: data.productName || data.lessonName,
          quantity: data.num,
          price: data.productDiscount || data.productPrice || data.lessonPrice,
        })
      })
      console.log(products)
      const data = { user_id, totalPrice, products }
      const url = 'http://localhost:3005/api/line-pay/create-order'
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          console.log(data)
          if (data.status === 'success') {
            setOrder(data.data.order)
          }
        })
        .catch((err) => {
          console.log(err)
        })
      // router.push('./step3')
    }
  }

  const goLinePay = () => {
    if (window.confirm('確認要導向至LINE Pay進行付款?')) {
      // 先連到node伺服器後，導向至LINE Pay付款頁面
      window.location.href = `http://localhost:3005/api/line-pay/reserve?orderId=${order.orderId}`
    }
  }

  const handleConfirm = async (transactionId) => {
    let res
    console.log('00000')
    const url = `http://localhost:3005/api/line-pay/confirm?transactionId=${transactionId}`
    console.log('00001')

    await fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        res = result
      })
      .catch((err) => {
        console.error('An error occurred:', err)
      })

    console.log('aaa')
    if (res.status === 'success') {
      toast.success('付款成功')
    } else {
      toast.error('付款失敗')
    }

    console.log('bbb')

    if (res.data) {
      setResult(res.data)
    }

    console.log('ccc')

    // 處理完畢，關閉載入狀態
    setIsLoading(false)
    console.log('ddd')
  }

  const notify = (msg) => {
    const msgBox = <p style={{ margin: 0 }}>{msg}</p>

    toast.error(msgBox)
  }

  const confirmOrder = (
    <>
      <h2>最後付款確認結果(returnCode=0000 代表成功): </h2>
      <p>{JSON.stringify(result)}</p>
      <p>
        <button
          onClick={() => {
            window.location.href = '/test/line-pay/order'
          }}
        >
          重新測試
        </button>
      </p>
    </>
  )

  if (isLoading) {
    return (
      <>
        <p>與伺服器連線同步中...</p>
      </>
    )
  }

  return (
    <div className="container">
      <CartStep step={2} />
      <div className="container">
        <div className="w-100 text-center section-name">
          <h5 className="span">購物車</h5>
        </div>
        <table>
          <thead>
            <tr>
              <th className="col-4 text-start">商品資料</th>
              <th className="col-2">商品價格</th>
              <th className="col-2">數量</th>
              <th className="col-2">小計</th>
              <th className="col-2"></th>
            </tr>
          </thead>
          <tbody>
            {cartData ? (
              cartData.map((item, i) => {
                const {
                  lessonName,
                  lessonPrice,
                  num,
                  productName,
                  productPrice,
                  productDiscount,
                } = item
                let price = 0
                if (productDiscount) {
                  price = productDiscount * num
                } else {
                  price = (productPrice || lessonPrice) * num
                }
                totalPrice += price
                return (
                  <tr key={i}>
                    <td>
                      <div className="row">
                        <img />
                        <div>
                          <h5 className="fw-bold text-start">
                            {productName || lessonName}
                          </h5>
                          <p className="imperceptible text-start">商品細節</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      {productDiscount ? (
                        <>
                          <h5 className="fw-bold discounted">
                            NT${productDiscount}
                          </h5>
                          <p className="imperceptible text-decoration-line-through">
                            NT${productPrice || lessonPrice}
                          </p>
                        </>
                      ) : (
                        <>
                          <h5 className="fw-bold">
                            NT${productPrice || lessonPrice}
                          </h5>
                        </>
                      )}
                    </td>
                    <td>
                      <span>{num}</span>
                    </td>
                    <td>NT${price}</td>
                  </tr>
                )
              })
            ) : (
              <></>
            )}
            {/* <tr>
              <td>
                <div className="row">
                  <img />
                  <div>
                    <h5 className="fw-bold text-start">商品名</h5>
                    <p className="imperceptible text-start">商品細節</p>
                  </div>
                </div>
              </td>
              <td>
                <h5 className="fw-bold discounted">打折後</h5>
                <p className="imperceptible text-decoration-line-through">
                  打折前
                </p>{' '}
              </td>
              <td>
                <span>數量</span>
              </td>
              <td>NT$XXX</td>
            </tr> */}
          </tbody>
        </table>
        <p className="text-end fw-bold my-3">合計: NT${totalPrice}</p>
      </div>
      <form onSubmit={handleSub}>
        <div className="container">
          <div className="w-100 section-name text-center">
            <h5 className="span">送貨資料</h5>
          </div>
          <div className="container">
            <div className="d-flex mt-3">
              <input
                type="checkbox"
                className="deliver_cb"
                onClick={() => t1Change()}
              />
              <h6 className="fw-bold">收貨人資料與會員資料相同</h6>
            </div>

            <div className="row justify-content-between spacing">
              <div className="col-6">
                <p className="fw-bold">收件人名稱</p>
                <input
                  type="text"
                  className="w-100 form-control user_name"
                  name="user_name"
                  defaultValue={userInputs.user_name}
                />
              </div>
              <div className="col-6">
                <p className="fw-bold">收件人電話</p>
                <input
                  type="text"
                  className="w-100 form-control user_phone"
                  name="user_phone"
                  defaultValue={userInputs.user_phone}
                />
              </div>
            </div>
            <p className="fw-bold">配送地址</p>
            <div className="row justify-content-between mb-3">
              <div className="col-3">
                <select
                  className="form-select user_city"
                  value={userInputs.user_city}
                  onChange={handleInputChange}
                  name="user_city"
                >
                  <option value="0" disabled>
                    縣/市
                  </option>
                  <option value="1市">1市</option>
                  <option value="2市">2市</option>
                  <option value="3市">3市</option>
                </select>
              </div>
              <div className="col-3">
                <select
                  className="form-select user_section"
                  value={userInputs.user_section}
                  onChange={() => {}}
                  name="user_section"
                >
                  <option value="0" disabled>
                    區
                  </option>
                  <option value="1區">1區</option>
                  <option value="2區">2區</option>
                  <option value="3區">3區</option>
                </select>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="w-100 form-control user_road"
                  name="user_road"
                  value={userInputs.user_road}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="w-100 section-name text-center">
            <h5 className="span">訂單備註</h5>
          </div>
          <textarea
            className="form-control spacing"
            rows="5"
            maxLength={50}
          ></textarea>
        </div>
        <div className="container credit-card-section">
          <div className="w-100 section-name text-center mb-3">
            <h5 className="span">信用卡付款資訊</h5>
          </div>
          <h6 className="span my-3">
            ※ 信用卡交易資訊 Credit Card Information
          </h6>
          <div className="row justify-content-between my-3">
            <p className="col-sm-2 col-3 fw-bold">信用卡卡號</p>
            <div className="col-2">
              <input
                type="text"
                className="form-control autotab-4"
                maxLength={4}
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control autotab-4"
                maxLength={4}
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control autotab-4"
                maxLength={4}
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control autotab-4"
                maxLength={4}
              />
            </div>
          </div>
          <div className="row justify-content-between my-3">
            <p className="col-sm-2 col-3 fw-bold">有效期限</p>
            <div className="col-2">
              <input
                type="text"
                className="form-control"
                maxLength={2}
                placeholder="MM"
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control"
                maxLength={2}
                placeholder="YY"
              />
            </div>
            <p className="col-2 fw-bold">安全碼</p>
            <div className="col-2">
              <input type="text" className="form-control" maxLength={3} />
            </div>{' '}
          </div>
          <h6 className="span my-3">※ 持卡人資料 Cardholder Information </h6>
          <div className="d-flex my-3">
            <input
              type="checkbox"
              className="credit_cb"
              onClick={() => t2Change()}
            />
            <h6 className="fw-bold">持卡人資料與會員資料相同</h6>
          </div>
          <div className="row justify-content-between">
            <div className="col-6">
              <p className="fw-bold">持卡人姓名</p>
              <input
                type="text"
                className="w-100 form-control cCard_name"
                name="cCard_name"
                defaultValue={userInputs.cCard_name}
              />
            </div>
            <div className="col-6">
              <p className="fw-bold">帳單地址</p>
              <input
                type="text"
                className="w-100 form-control cCard_address"
                name="cCard_address"
                defaultValue={userInputs.cCard_address}
              />
            </div>
          </div>
          <div className="text-end my-3">
            {/* <Link href="./step3">
              <button
                type="submit"
                className="btn next-step-btn text-white px-5"
                onClick={(e) => {
                  handleBtnSubmit(e)
                }}
              >
                <h5 className="fw-bold py-1 px-3">提交訂單</h5>
              </button>
            </Link> */}
            <button type="submit" className="btn next-step-btn text-white px-5">
              <h5 className="fw-bold py-1 px-3">提交訂單</h5>
            </button>
          </div>
        </div>
      </form>
      <button onClick={goLinePay} disabled={!order.orderId}>
        前往付款
      </button>
      {result.returnCode ? confirmOrder : <h1>tttt</h1>}
      <style jsx>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
        }

        .span {
          color: #013c64;
          font-weight: bold;
        }

        .next-step-btn {
          background-color: #ff9720;
        }

        .spacing {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        .discounted {
          color: #dc5151;
        }

        .imperceptible {
          color: #858585;
        }

        .section-name {
          background-color: #f5f5f5;
          padding-left: 0.5rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }

        table {
          width: 100%;
        }

        tr {
          border-bottom: 1px solid black;
        }

        td,
        th {
          padding-top: 1rem;
          padding-bottom: 1rem;
          text-align: center;
        }

        @media (max-width: 576px) {
          .credit-card-section {
          }
        }
      `}</style>
      <AutoTab className="autotab-4" maxLength={4} />
      <Toaster position="bottom-center" />
    </div>
  )
}
