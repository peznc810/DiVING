//react next
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
//hook
import { useAuth } from '@/hooks/auth'
import { useCart } from '@/hooks/cart'
import { useUsingCoupon } from '@/hooks/use-usingCoupon'
//component
import Order from '@/components/cart/order'
import CartStep from '@/components/cart/cart-step'
import OrderForm from '@/components/cart/order-form'
//通知視窗
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
  const router = useRouter()

  const { auth } = useAuth()
  const { items, cart } = useCart()
  const { usingCoupon } = useUsingCoupon()

  const [finalPrice, setFinalPrice] = useState()
  const [order, setOrder] = useState({})
  const [isDone, setIsDone] = useState(false)
  const [userInputs, setUserInputs] = useState({
    user_name: '',
    user_phone: '',
    user_city: '',
    user_section: '',
    user_road: '',
    cCard_name: '',
    cCard_address: '',
    order_note: '',
    cCard_number1: '',
    cCard_number2: '',
    cCard_number3: '',
    cCard_number4: '',
    cCard_securityCode: '',
    cCard_expirationMonth: '',
    cCard_expirationYear: '',
    store_name: '',
    store_address: '',
  })

  const { payment, delivery } = router.query

  useEffect(() => {
    if (router.isReady) {
      if (usingCoupon) {
        setFinalPrice(usingCoupon.finalPrice)
      }
    }
  }, [router.isReady])

  const { transactionId, orderId } = router.query

  //檢查交易是否成功

  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        if (!transactionId && orderId) {
          await getOrder(orderId)
        }
        if (!transactionId || !orderId) {
          return
        }
        if (!isDone) {
          await handleConfirmLinePay(transactionId)
        }
      }
    }
    fetchData()
  }, [router.isReady])

  //檢查格式
  const checkFormat = () => {
    const phone = document.querySelector('.user_phone').value
    const user_name = document.querySelector('.user_name').value
    const cCard_name = document.querySelector('.cCard_name')?.value

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

    if (cCard_name) {
      if (!checkCorr(cCard_name, chineseRegex, '持卡人姓名 格式錯誤')) {
        return false
      }
    }

    return true
  }

  //處理送出訂單
  const handleSubLinePay = (e) => {
    e.preventDefault()
    if (checkFormat()) {
      //line pay 所需的格式
      const lineProducts = []
      items.forEach((data) => {
        const id = data.product_id || data.lesson_id
        const name = data.name
        const price = data.discount_price || data.price
        lineProducts.push({
          id,
          name,
          quantity: data.num,
          price,
        })
      })
      if (usingCoupon) {
        lineProducts.push({
          id: 0,
          name: '折扣',
          quantity: 1,
          price: usingCoupon.discount * -1 + cart.deliveryFee,
        })
      }

      //資料庫的格式 order_detail
      const products = []
      items.forEach((data) => {
        products.push(data)
      })

      const receiverAddress =
        userInputs.user_city + userInputs.user_section + userInputs.user_road

      const receiver = {
        name: userInputs.user_name,
        phone: userInputs.user_phone,
        address: receiverAddress || userInputs.store_address,
        store_name: userInputs.store_name,
      }

      const order_note = userInputs.order_note

      let shipment
      switch (delivery) {
        case '1':
          shipment = '宅配'
          break
        case '2':
          shipment = '7-11取貨'
          break
      }

      const data = {
        user_id: auth.id,
        totalPrice: (usingCoupon && usingCoupon.finalPrice) || cart.totalPrice,
        lineProducts,
        products,
        receiver,
        order_note,
        shipment,
      }
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
          if (data.status === 'success') {
            setOrder(data.data.order)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleSub = (e) => {
    e.preventDefault()
    if (checkFormat()) {
      //資料庫的格式 order_detail
      const products = items.map((data) => data)

      const receiverAddress =
        userInputs.user_city + userInputs.user_section + userInputs.user_road

      const receiver = {
        name: userInputs.user_name,
        phone: userInputs.user_phone,
        address: receiverAddress || userInputs.store_address,
        store_name: userInputs.store_name,
      }

      const expirationDate = `${userInputs.cCard_expirationMonth}/${userInputs.cCard_expirationYear}`

      const number = `${userInputs.cCard_number1}-${userInputs.cCard_number2}-${userInputs.cCard_number3}-${userInputs.cCard_number4}`

      const credit_card = {
        number,
        securityCode: userInputs.cCard_securityCode,
        expirationDate,
        name: userInputs.cCard_name,
        address: userInputs.cCard_address,
      }

      const order_note = userInputs.order_note

      const shipment = delivery === '1' ? '宅配' : '7-11取貨'

      const data = {
        user_id: auth.id,
        totalPrice: (usingCoupon && usingCoupon.finalPrice) || cart.totalPrice,
        products,
        receiver,
        order_note,
        shipment,
        ...(userInputs.cCard_number1 && { credit_card }),
      }

      const url = 'http://localhost:3005/api/order/create-order'
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
          if (data.status === 'success') {
            setOrder(data.data.dbOrder)
            window.location.href = `http://localhost:3000/cart/step2?orderId=${data.data.dbOrder.id}`
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const goLinePay = () => {
    if (window.confirm('確認要導向至LINE Pay進行付款?')) {
      // 先連到node伺服器後，導向至LINE Pay付款頁面
      window.location.href = `http://localhost:3005/api/line-pay/reserve?orderId=${order.orderId}`
    }
  }

  const getOrder = async (orderId) => {
    try {
      const url = `http://localhost:3005/api/order/order?orderId=${orderId}`
      const response = await fetch(url, {
        method: 'GET',
      })

      const result = await response.json()

      console.log(result)

      setIsDone(true)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const handleConfirmLinePay = async (transactionId) => {
    try {
      const url = `http://localhost:3005/api/line-pay/confirm?transactionId=${transactionId}`
      const response = await fetch(url, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()

      if (result.status === 'success') {
        toast.success('付款成功')
      } else if (result.status === 'repeat') {
        toast.success('訂單已成立')
      } else {
        toast.error('付款失敗')
      }

      setIsDone(true)
    } catch (error) {
      console.error('An error occurred:', error)
      toast.error('發生錯誤，無法確認付款')
    }
  }

  //格式錯誤通知
  const notify = (msg) => {
    const msgBox = <p style={{ margin: 0 }}>{msg}</p>
    toast.error(msgBox)
  }

  return (
    <>
      {isDone ? (
        <Order orderId={orderId} />
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
                {cart.items ? (
                  cart.items.map((item, i) => {
                    const {
                      price,
                      num,
                      name,
                      discount_price,
                      product_detail,
                      order_time,
                      subtotal,
                    } = item
                    const detail = product_detail || order_time
                    return (
                      <tr key={i}>
                        <td>
                          <div className="row">
                            <img />
                            <div>
                              <h5 className="fw-bold text-start">{name}</h5>
                              <p className="imperceptible text-start">
                                {detail}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          {discount_price ? (
                            <>
                              <h5 className="fw-bold discounted">
                                NT${discount_price}
                              </h5>
                              <p className="imperceptible text-decoration-line-through">
                                NT${price}
                              </p>
                            </>
                          ) : (
                            <>
                              <h5 className="fw-bold">NT${price}</h5>
                            </>
                          )}
                        </td>
                        <td>
                          <span>{num}</span>
                        </td>
                        <td>NT${subtotal}</td>
                      </tr>
                    )
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </table>
            <p className="text-end fw-bold my-3">
              合計: NT$
              {finalPrice || cart.totalPrice}
            </p>
          </div>
          <OrderForm
            handleSubLinePay={handleSubLinePay}
            handleSub={handleSub}
            userInputs={userInputs}
            setUserInputs={setUserInputs}
            payment={payment}
            delivery={delivery}
          />
          {payment === '3' && (
            <button onClick={goLinePay} disabled={!order.orderId}>
              Line Pay
            </button>
          )}

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
          `}</style>
          <Toaster position="bottom-center" />
        </div>
      )}
    </>
  )
}
