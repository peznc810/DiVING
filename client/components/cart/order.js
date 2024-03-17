import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import CartStep from '@/components/cart/cart-step'
import { useRouter } from 'next/router'

export default function Order({ orderIdTest }) {
  const router = useRouter()
  const { orderId } = router.query

  const [order, setOrder] = useState(null)
  const [orderDetail, setOrderDetail] = useState(null)
  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        await fetch(
          `http://localhost:3005/api/order/order-detail?orderId=${orderIdTest}`,
          {
            method: 'GET',
          }
        )
          .then((response) => {
            return response.json()
          })
          .then((result) => {
            setOrderDetail(result)
          })
          .catch((err) => {
            console.error('An error occurred:', err)
          })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    const fetchOrder = async () => {
      try {
        await fetch(
          `http://localhost:3005/api/order/order?orderId=${orderIdTest}`,
          {
            method: 'GET',
          }
        )
          .then((response) => {
            return response.json()
          })
          .then(([result]) => {
            setOrder(result)
          })
          .catch((err) => {
            console.error('An error occurred:', err)
          })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchOrderDetail()
    fetchOrder()
  }, [])

  console.log(order)

  let totalPrice = 0
  return (
    <div className="container">
      <CartStep step={3} />
      <div className="container">
        <div className="w-100 section-name text-center">
          <h5 className="span">訂單資訊</h5>
        </div>
        <div className="row">
          <p className="col fw-bold">訂單編號</p>
          <p className="col text-end">{orderId}</p>
        </div>
        <div className="row fw-bold">
          <p className="col-6">商品明細</p>
          <p className="col">數量</p>
          <p className="col  text-end">小計</p>
        </div>
        {orderDetail &&
          orderDetail.map((item, i) => {
            const { name, num, price } = item
            const singleItemsPrice = price * num
            totalPrice += singleItemsPrice
            return (
              <div className="row" key={i}>
                <p className="col-6 fw-bold">{name}</p>
                <p className="col">{num}</p>
                <p className="col text-end">NT${singleItemsPrice}</p>
              </div>
            )
          })}
        <hr />
        <div className="row">
          <p className="col fw-bold">合計</p>
          <p className="col fw-bold text-end">
            NT$ {order && order.total_price}
          </p>
        </div>
        <div className="text-end my-3">
          <Link href="../">
            <button type="button" className="btn next-step-btn text-white px-5">
              <h5 className="fw-bold py-1 px-3">返回商場</h5>
            </button>
          </Link>
        </div>
      </div>
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

        .row {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        .section-name {
          background-color: #f5f5f5;
          padding-left: 0.5rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }

        .next-step-btn {
          background-color: #ff9720;
        }
      `}</style>
    </div>
  )
}
