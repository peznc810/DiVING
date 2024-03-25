import React, { useState, useEffect } from 'react'

import Delivery from './form/delivery'
import CreditCard from './form/credit-card'
import Store711 from './form/store-711'
import { useAuth } from '@/hooks/auth'
import { useCart } from '@/hooks/cart'
import { useUsingCoupon } from '@/hooks/use-usingCoupon'

import toast from 'react-hot-toast'
import styles from './cart.module.scss'

export default function OrderForm({ payment, delivery, order, setOrder }) {
  const [cUser, setCUser] = useState()
  const { auth } = useAuth()
  const { items, cart } = useCart()
  const { usingCoupon } = useUsingCoupon()
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

  if (typeof window !== 'undefined') {
    localStorage.setItem('store711', '')
  }

  const getUserProfile = async (id) => {
    const token = localStorage.getItem('token')
    const url = `http://localhost:3005/api/users/${id}`
    await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((result) => {
        setCUser(result.userData)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (auth.id !== '') {
      getUserProfile(auth.id)
    }
  }, [auth])

  useEffect(() => {
    if (order.orderId) {
      toast.success('訂單建立成功')
    }
  }, [order])

  //處理input更新
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

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
        usingCoupon,
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
        usingCoupon,
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

  const checkFormat = () => {
    let emptyInput

    const chineseRegex = /^[\u4e00-\u9fa5]+$/
    const phoneRegex = /^09\d{8}$/
    const monthRegex = /0[1-9]|1[0-2]/
    const yearRegex = /\d{2}/
    const securityRegex = /\d{3}/

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

    if (!checkCorr(userInputs.user_name, chineseRegex, '收件人名稱 格式錯誤')) {
      return false
    }

    if (!checkCorr(userInputs.user_phone, phoneRegex, '收件人電話 格式錯誤')) {
      return false
    }

    if (payment === '2') {
      if (
        !checkCorr(userInputs.cCard_name, chineseRegex, '持卡人姓名 格式錯誤')
      ) {
        return false
      }

      if (
        !checkCorr(
          userInputs.cCard_expirationMonth,
          monthRegex,
          '信用卡月份 格式錯誤'
        )
      ) {
        return false
      }

      if (
        !checkCorr(
          userInputs.cCard_expirationYear,
          yearRegex,
          '信用卡年份 格式錯誤'
        )
      ) {
        return false
      }

      if (
        !checkCorr(
          userInputs.cCard_securityCode,
          securityRegex,
          '信用卡安全碼 格式錯誤'
        )
      ) {
        return false
      }
    }

    return true
  }

  const goLinePay = () => {
    if (window.confirm('確認要導向至LINE Pay進行付款?')) {
      // 先連到node伺服器後，導向至LINE Pay付款頁面
      window.location.href = `http://localhost:3005/api/line-pay/reserve?orderId=${order.orderId}`
    }
  }

  const notify = (msg) => {
    const msgBox = <p style={{ margin: 0 }}>{msg}</p>
    toast.error(msgBox)
  }

  return (
    <>
      <div className="container">
        <form onSubmit={payment === '3' ? handleSubLinePay : handleSub}>
          {delivery === '1' ? (
            <Delivery
              handleInputChange={handleInputChange}
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              cUser={cUser}
            />
          ) : (
            <Store711
              handleInputChange={handleInputChange}
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              cUser={cUser}
            />
          )}

          <div className="container">
            <div className={`w-100 ${styles.sectionName} text-center`}>
              <h5 className={`${styles.span}`}>訂單備註</h5>
            </div>
            <textarea
              className={`form-control ${styles.spacing}`}
              rows="5"
              maxLength={50}
              name="order_note"
              defaultValue={userInputs.order_note}
              onChange={handleInputChange}
            ></textarea>
          </div>
          {payment === '2' && (
            <CreditCard
              handleInputChange={handleInputChange}
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              cUser={cUser}
            />
          )}
          <div className="text-end my-3">
            <button
              type="submit"
              className={`btn nextStepBtn text-white px-5`}
              disabled={order.orderId}
            >
              <h5 className="fw-bold py-1 px-3">提交訂單</h5>
            </button>
          </div>
        </form>
        {payment === '3' && (
          <div className="text-end">
            <button
              className="btn text-end text-white line-pay-btn my-3"
              onClick={goLinePay}
              disabled={!order.orderId}
            >
              Line Pay
            </button>
          </div>
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

          .nextStepBtn {
            background-color: #ff9720;
          }

          .line-pay-btn {
            background-color: green;
          }
        `}</style>
      </div>
    </>
  )
}
