import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import CartStep from '@/components/cart/cart-step'
import AutoTab from '@/components/cart/test'
import userData from '@/data/cart/user.json'
import Order from '@/components/cart/order'

import { useRouter } from 'next/router'

//抓取使用者
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
  const [isDone, setIsDone] = useState(false)

  const { orderId } = router.query

  let totalPrice = 0

  //抓取購物車的內容
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    if (data) {
      setCartData(data)
    }
  }, [])

  //檢查交易是否成功
  useEffect(() => {
    const { transactionId, orderId } = router.query
    const fetchData = async () => {
      if (router.isReady) {
        if (!transactionId || !orderId) {
          return
        }
        if (!isDone) {
          await handleConfirm(transactionId)
        }
      }
    }
    fetchData()
  }, [router.isReady])

  //勾選資料相同 收貨人
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

  //勾選資料相同 持卡人
  const t2Change = () => {
    setUserInputs((prevState) => ({
      ...prevState,
      cCard_name: cUser.name,
      cCard_address: cUser.address,
    }))
  }

  //處理input更新
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  //檢查格式
  const checkFormat = () => {
    const phone = document.querySelector('.user_phone').value
    const user_name = document.querySelector('.user_name').value
    const cCard_name = document.querySelector('.cCard_name').value

    let emptyInput

    const phoneRegex = /^09\d{8}$/
    const chineseRegex = /^[\u4e00-\u9fa5]+$/

    const inputs = document.querySelectorAll('input[type=text]')

    inputs.forEach((input) => {
      if (!input.value) {
        emptyInput = '有地方尚未填寫'
      }
    })

    if (emptyInput) {
      notify(emptyInput)
      return false
    }

    function checkCorr(value, regex, errMsg) {
      if (!regex.test(value)) {
        notify(errMsg)
        return false
      }
      return true
    }

    if (!checkCorr(phone, phoneRegex, '收件人電話 格式錯誤')) {
      return false
    }

    if (!checkCorr(user_name, chineseRegex, '收件人名稱 格式錯誤')) {
      return false
    }

    if (!checkCorr(cCard_name, chineseRegex, '持卡人姓名 格式錯誤')) {
      return false
    }

    return true
  }

  //處理送出訂單
  const handleSub = (e) => {
    e.preventDefault()
    if (checkFormat()) {
      //line pay 所需的格式
      const lineProducts = []
      cartData.forEach((data) => {
        const id = data.product_id || data.lesson_id
        const name = data.productName || data.lessonName
        const price =
          data.productDiscount || data.productPrice || data.lessonPrice
        lineProducts.push({
          id,
          name,
          quantity: data.num,
          price,
        })
      })
      // cartData.forEach((data) => {
      //   lineProducts.push({
      //     id: data.product_id || data.lesson_id,
      //     name: data.productName || data.lessonName,
      //     quantity: data.num,
      //     price: data.productDiscount || data.productPrice || data.lessonPrice,
      //   })
      // })

      //資料庫的格式 order_detail
      const products = []
      cartData.forEach((data) => {
        products.push(data)
      })

      const data = { user_id, totalPrice, lineProducts, products }
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

  //處理訂單狀態
  const handleConfirm = async (transactionId) => {
    let res
    const url = `http://localhost:3005/api/line-pay/confirm?transactionId=${transactionId}`

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

    if (res.status === 'success') {
      toast.success('付款成功')
    } else {
      toast.error('付款失敗')
    }

    if (res.data) {
      setResult(res.data)
    }

    setIsDone(true)
  }

  //格式錯誤通知
  const notify = (msg) => {
    const msgBox = <p style={{ margin: 0 }}>{msg}</p>
    toast.error(msgBox)
  }

  return (
    <>
      {console.log(result.returnCode)}
      {isDone ? (
        <Order orderIdTest={orderId} />
      ) : (
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
                    {
                      /* let price = 0
                    if (productDiscount) {
                      price = productDiscount * num
                    } else {
                      price = (productPrice || lessonPrice) * num
                    } */
                    }
                    let price = productDiscount
                      ? productDiscount * num
                      : (productPrice || lessonPrice) * num
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
                              <p className="imperceptible text-start">
                                商品細節
                              </p>
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
              <h6 className="span my-3">
                ※ 持卡人資料 Cardholder Information{' '}
              </h6>
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
                <button
                  type="submit"
                  className="btn next-step-btn text-white px-5"
                >
                  <h5 className="fw-bold py-1 px-3">提交訂單</h5>
                </button>
              </div>
            </div>
          </form>
          <button onClick={goLinePay} disabled={!order.orderId}>
            前往付款
          </button>
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
              padding: 0.5rem;
            }

            table {
              width: 100%;
            }

            tr {
              border-bottom: 1px solid black;
            }

            td,
            th {
              padding: 1rem 0;
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
      )}
    </>
  )
}
