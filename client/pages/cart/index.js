import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

import { useAuth } from '@/hooks/auth'

import { FaShoppingCart, FaRegTrashAlt } from 'react-icons/fa'
import CartStep from '@/components/cart/cart-step'

//抓取使用者擁有的優惠券
// let coupon_has

// await fetch(`http://localhost:3005/api/order/user-coupon?userId=${auth.id}`, {
//   method: 'GET',
// })
//   .then((response) => {
//     return response.json()
//   })
//   .then((result) => {
//     coupon_has = result
//   })
//   .catch((err) => {
//     console.error('An error occurred:', err)
//   })

// console.log(coupon_has)

export default function Home() {
  const [cartData, setCartData] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [deliveryFee] = useState(50)
  const [discount] = useState(0)

  const { auth } = useAuth()

  //抓取購物車內的物品
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    if (data) {
      setCartData(data)
      calculateTotalPrice(data)
    }
  }, [])

  //刪除通知
  const notifySA = (productName, i) => {
    MySwal.fire({
      icon: 'question',
      title: <>{`確認要刪除${productName}嗎?`}</>,
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
        handleDeleteItem(i)
      }
    })
  }

  //計算價格
  const calculateTotalPrice = (data) => {
    let total = 0
    data.forEach(({ productDiscount, num, productPrice, lessonPrice }) => {
      const price = productDiscount
        ? productDiscount * num
        : (productPrice || lessonPrice) * num
      total += price
    })
    setTotalPrice(total)
  }

  //增加商品數量
  const handleIncrement = (index) => {
    const updatedCartData = [...cartData]
    updatedCartData[index].num += 1
    setCartData(updatedCartData)
    localStorage.setItem('cart', JSON.stringify(updatedCartData))
    // calculateTotalPrice(updatedCartData)
  }

  //減少商品數量
  const handleDecrement = (index) => {
    const updatedCartData = [...cartData]
    if (updatedCartData[index].num > 1) {
      updatedCartData[index].num -= 1
      setCartData(updatedCartData)
      localStorage.setItem('cart', JSON.stringify(updatedCartData))
      // calculateTotalPrice(updatedCartData)
    }
  }

  //更改商品數量
  const handleInputChange = (index, event) => {
    const updatedCartData = [...cartData]
    const newValue = parseInt(event.target.value)
    if (!isNaN(newValue) && newValue > 0) {
      updatedCartData[index].num = newValue
      setCartData(updatedCartData)
      localStorage.setItem('cart', JSON.stringify(updatedCartData))
      // calculateTotalPrice(updatedCartData)
    }
  }

  //刪除商品
  const handleDeleteItem = (index) => {
    const updatedCartData = [...cartData]
    updatedCartData.splice(index, 1)
    setCartData(updatedCartData)
    localStorage.setItem('cart', JSON.stringify(updatedCartData))
    // calculateTotalPrice(updatedCartData)
  }

  //購物車更動後 更新價格
  useEffect(() => {
    calculateTotalPrice(cartData)
  }, [cartData])

  return (
    <div className="container">
      <CartStep step={1} />
      <div className="container">
        <div className="section-name d-flex">
          <FaShoppingCart size={20} color="#013C64" />
          <h5 className="ms-2 span">X項商品</h5>
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
                  product_detail,
                  order_time,
                } = item
                let price = 0
                if (productDiscount) {
                  price = productDiscount * num
                } else {
                  price = (productPrice || lessonPrice) * num
                }
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
                            {product_detail || order_time}
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
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => handleDecrement(i)}
                      >
                        <i className="bi bi-dash-lg"></i>
                      </button>
                      <input
                        type="text"
                        className={`w-25 text-center input${i}`}
                        value={num}
                        onChange={(event) => handleInputChange(i, event)}
                      />
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => handleIncrement(i)}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    </td>
                    <td>
                      <p className={`Price${i}`}>NT${price}</p>
                    </td>
                    <td>
                      <FaRegTrashAlt
                        size={22}
                        onClick={() => notifySA(productName || lessonName, i)}
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
            <select className="form-select" id="delivery">
              <option value="1">宅配</option>
              <option value="2">7-11</option>
            </select>
            <p className="select-dec">付款方式</p>
            <select className="form-select" id="payment">
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
            <a>優惠券</a>
            <hr />
            <div className="d-flex justify-content-between spacing fw-bold">
              <p>合計:</p>
              <p>NT$ {totalPrice + deliveryFee - discount}</p>
            </div>
            <Link href="./cart/step2">
              <button
                type="button"
                className="btn next-step-btn w-100 text-white"
              >
                <h5 className="fw-bold py-1">前往結帳</h5>
              </button>
            </Link>
          </div>
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

         {
          /* .pay-section {
          border: 1px solid #f5f5f5;
          padding: 0;
        }

        .order-section {
          border: 1px solid #f5f5f5;
          padding: 0;
        } */
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
