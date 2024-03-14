import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

import { useAuth } from '@/hooks/auth'
import { useCart } from '@/hooks/cart'
import { useUsingCoupon } from '@/hooks/use-usingCoupon'

import { FaShoppingCart, FaRegTrashAlt } from 'react-icons/fa'
import CartStep from '@/components/cart/cart-step'
// inchhhhh 新增
import CouponModal from '@/components/cart/coupon-modal'
import { useCouponHas } from '@/hooks/use-couponHasData'

export default function Home() {
  const [discount, setDiscount] = useState(0)
  // inchhhhh 新增
  const { couponHas, setCouponHas } = useCouponHas()
  const [showCoupon, setShowCoupon] = useState(false)
  const { items, updateItemQty, increment, decrement, removeItem, cart } =
    useCart()
  const { auth } = useAuth()
  const { coupon, applyCoupon } = useUsingCoupon()

  const [payment, setPayment] = useState(1)
  const [delivery, setDelivery] = useState(1)
  const [totalTotalPrice, setTotalTotalPrice] = useState(cart.totalPrice)

  useEffect(() => {
    setTotalTotalPrice(cart.totalPrice)
  }, [cart])
  //刪除通知
  const notifySA = (name, id, isProduct) => {
    MySwal.fire({
      icon: 'question',
      title: <>{`確認要刪除${name}嗎?`}</>,
      showConfirmButton: true,
      confirmButtonText: '確認',
      showDenyButton: true,
      denyButtonText: `取消`,
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '已成功刪除!',
          icon: 'success',
        })
        removeItem(id, isProduct)
      }
    })
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    name === 'payment' ? setPayment(value) : setDelivery(value)
  }

  const { totalPrice, deliveryFee } = cart

  // 收到coupon傳來的資訊
  const selectedCouponData = (data) => {
    console.log(data)
    if (!data) return totalPrice + deliveryFee
    const { user_id, coupon_id, coupon_discount, coupon_rule, valid } = data
    console.log(valid)
    let updateTotalPrice = 0
    let updateDiscount = 0
    // 判斷小記金額是否大於coupon_rule
    if (totalPrice > coupon_rule) {
      // Number.isInteger()檢查是否為整數
      if (!Number.isInteger(coupon_discount)) {
        console.log('object')
        updateTotalPrice = Math.round(
          totalPrice * coupon_discount + deliveryFee
        )
      } else {
        updateTotalPrice = totalPrice - coupon_discount + deliveryFee
        console.log(coupon_discount)
      }
      updateDiscount = (updateTotalPrice - totalPrice - deliveryFee) * -1
    } else {
      updateTotalPrice = totalPrice + deliveryFee
    }
    // 把選擇的coupon資料存在cart的localStorage
    cart.coupon = {
      userID: user_id,
      couponID: coupon_id,
      discount: coupon_discount,
      valid: valid,
    }
    cart.finalPrice = updateTotalPrice
    setTotalTotalPrice(updateTotalPrice)
    setDiscount(updateDiscount)
  }
  console.log(cart)
  // 送出已使用的優惠卷給後端
  useEffect(() => {
    if (cart && cart.coupon) {
      const { coupon } = cart
      console.log(coupon)
      const url = 'http://localhost:3005/api/coupon'
      fetch(url, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coupon),
      })
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [cart.coupon])

  return (
    <div className="container">
      <CartStep step={1} />
      <div className="container">
        <div className="section-name d-flex">
          <FaShoppingCart size={20} color="#013C64" />
          <h5 className="ms-2 span">{items.length}項商品</h5>
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
            {items ? (
              items.map((item, i) => {
                const {
                  product_id,
                  lesson_id,
                  price,
                  num,
                  name,
                  discount_price,
                  product_detail,
                  order_time,
                } = item
                const id = product_id || lesson_id
                const detail = product_detail || order_time
                const isProduct = item.product_id ? true : false
                let totalPrice
                if (discount_price) {
                  totalPrice = discount_price * num
                } else {
                  totalPrice = price * num
                }
                return (
                  <tr key={i}>
                    <td>
                      <div className="row">
                        <img />
                        <div>
                          <h5 className="fw-bold text-start">{name}</h5>
                          <p className="imperceptible text-start">{detail}</p>
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
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => {
                          decrement(id, isProduct)
                        }}
                      >
                        <i className="bi bi-dash-lg"></i>
                      </button>
                      <input
                        type="text"
                        className={`w-25 text-center input${i}`}
                        value={num}
                        onChange={(e) => {
                          updateItemQty(id, parseInt(e.target.value), isProduct)
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => {
                          increment(id, isProduct)
                        }}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    </td>
                    <td>
                      <p className={`price${i}`}>NT${totalPrice}</p>
                    </td>
                    <td>
                      <FaRegTrashAlt
                        size={22}
                        onClick={() => notifySA(name, id, isProduct)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                  </tr>
                )
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      <div className="row mt-5 container justify-content-between order-detail">
        <div className="col-sm-7 pay-section">
          <h5 className="mb-3 section-name span">選擇送貨及付款方式</h5>
          <div className="container">
            <p className="select-dec">送貨方式</p>
            <select
              className="form-select"
              name="delivery"
              value={delivery}
              onChange={handleSelectChange}
            >
              <option value="1">宅配</option>
              <option value="2">7-11</option>
            </select>
            <p className="select-dec">付款方式</p>
            <select
              className="form-select"
              name="payment"
              value={payment}
              onChange={handleSelectChange}
            >
              <option value="1">貨到付款</option>
              <option value="2">信用卡付款</option>
              <option value="3">Line Pay</option>
            </select>
          </div>
        </div>
        <div className="col-sm-4 order-section">
          <h5 className="mb-3 section-name span">訂單資訊</h5>
          <div className="container">
            <div className="d-flex justify-content-between spacing">
              <p className="fw-bold">小計:</p>
              <p>NT$ {totalPrice}</p>
            </div>
            <div className="d-flex justify-content-between spacing">
              <p className="fw-bold">運費:</p>
              <p>NT$ {deliveryFee}</p>
            </div>
            <p className="text-end">優惠 -NT${discount}</p>
            <button
              type="button"
              className="coupon-btn p-0 my-2"
              onClick={() => {
                setShowCoupon(true)
              }}
            >
              選擇優惠券
            </button>
            <hr />
            <div className="d-flex justify-content-between spacing fw-bold">
              <p>合計:</p>
              <p>NT$ {totalTotalPrice}</p>
            </div>
            <Link
              href={
                auth.isAuth && !cart.isEmpty
                  ? `./cart/step2?payment=${payment}&delivery=${delivery}`
                  : ''
              }
            >
              <button
                type="button"
                className="btn next-step-btn w-100 text-white"
                disabled={!auth.isAuth || cart.isEmpty}
              >
                <h5 className="fw-bold py-1">
                  {auth.isAuth && !cart.isEmpty
                    ? '前往結帳'
                    : cart.isEmpty
                    ? '購物車內尚無商品'
                    : '尚未登入'}
                </h5>
              </button>
            </Link>
          </div>
        </div>

        <div>
          <button type="submit" onClick={() => {}}>
            送出
          </button>
        </div>
      </div>
      <CouponModal
        showCoupon={showCoupon}
        setShowCoupon={setShowCoupon}
        couponHas={couponHas}
        dataForParent={selectedCouponData}
      />
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

        .order-detail,
        .spacing {
          margin-inline: 0;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        .next-step-btn {
          background-color: #ff9720;
        }

        .span {
          color: #013c64;
          font-weight: bold;
        }

        input {
          background-color: #f8f9fa;
          border: 0;
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

        .pay-section,
        .order-section {
          border: 1px solid #f5f5f5;
          padding: 0;
        }

        .select-dec {
          font-size: 18px;
          margin-bottom: 0.5rem;
        }

        .form-select {
          margin-bottom: 1rem;
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

        .coupon-btn {
          border: none;
          background-color: transparent;
          font-size: 14px;
          color: #265475;
        }
        .coupon-btn:hover {
          border-bottom: 1px solid #265475;
        }

        .btn-light {
          padding: 2px 6px;
        }

        @media (max-width: 576px) {
          .order-section {
            margin-top: 1rem;
          }

          .btn-light {
            padding: 6px;
          }
        }
      `}</style>
    </div>
  )
}
