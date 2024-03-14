import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

import { FaShoppingCart, FaRegTrashAlt } from 'react-icons/fa'
import CartStep from '@/components/cart/cart-step'
// inchhhhh 新增
import CouponModal from '@/components/cart/coupon-modal'
import { useCouponHas } from '@/hooks/use-couponHasData'
import { set } from 'lodash'

export default function Home() {
  const [cartData, setCartData] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalTotalPrice, setTotalTotalPrice] = useState(0)
  const [deliveryFee] = useState(50)
  const [discount, setDiscount] = useState(0)
  // inchhhhh 新增
  const { couponHas, setCouponHas } = useCouponHas()
  const [showCoupon, setShowCoupon] = useState(false)
  const [couponFromChildren, setCouponFromChildren] = useState(null) // modal傳來的資訊

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    setCartData(data)
    calculateTotalPrice(data)
  }, [])

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

  const calculateTotalPrice = (data) => {
    let total = 0
    data.forEach((item) => {
      const { productDiscount, num, productPrice, lessonPrice } = item
      const price = productDiscount
        ? productDiscount * num
        : (productPrice || lessonPrice) * num
      total += price
    })
    setTotalPrice(total)
  }

  const handleIncrement = (index) => {
    const updatedCartData = [...cartData]
    updatedCartData[index].num += 1
    setCartData(updatedCartData)
    localStorage.setItem('cart', JSON.stringify(updatedCartData))
    calculateTotalPrice(updatedCartData)
  }

  const handleDecrement = (index) => {
    const updatedCartData = [...cartData]
    if (updatedCartData[index].num > 1) {
      updatedCartData[index].num -= 1
      setCartData(updatedCartData)
      localStorage.setItem('cart', JSON.stringify(updatedCartData))
      calculateTotalPrice(updatedCartData)
    }
  }

  const handleInputChange = (index, event) => {
    const updatedCartData = [...cartData]
    const newValue = parseInt(event.target.value)
    if (!isNaN(newValue) && newValue > 0) {
      updatedCartData[index].num = newValue
      setCartData(updatedCartData)
      localStorage.setItem('cart', JSON.stringify(updatedCartData))
      calculateTotalPrice(updatedCartData)
    }
  }

  const handleDeleteItem = (index) => {
    const updatedCartData = [...cartData]
    updatedCartData.splice(index, 1)
    setCartData(updatedCartData)
    localStorage.setItem('cart', JSON.stringify(updatedCartData))
    calculateTotalPrice(updatedCartData)
  }

  // 收到coupon傳來的資訊
  const selectedCouponData = (data) => {
    console.log(data)
    if (!data) return totalPrice + deliveryFee
    const { coupon_discount, coupon_rule } = data
    // console.log(coupon_discount, coupon_rule)
    let updateTotalPrice = 0
    let updateDiscount = 0
    // 判斷小記金額是否大於coupon_rule
    if (totalPrice > coupon_rule) {
      // Number.isInteger()檢查是否為整數
      if (!Number.isInteger(coupon_discount)) {
        console.log('object')
        updateTotalPrice = totalPrice * coupon_discount + deliveryFee
      } else {
        updateTotalPrice = totalPrice - coupon_discount + deliveryFee
        console.log(coupon_discount)
      }
      updateDiscount = (updateTotalPrice - totalPrice - deliveryFee) * -1
    } else {
      updateTotalPrice = totalPrice + deliveryFee
    }
    setTotalTotalPrice(updateTotalPrice)
    setDiscount(updateDiscount)
  }
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
                      {/* <h5 className="fw-bold discounted">打折後</h5>
                      <p className="imperceptible text-decoration-line-through">
                        {productPrice || lessonPrice}
                      </p> */}
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
                </p>
              </td>
              <td>
                <button type="button" className="btn btn-light">
                  +
                </button>
                <input
                  type="text"
                  className="w-25 text-center"
                  placeholder="1"
                />
                <button type="button" className="btn btn-light">
                  -
                </button>
              </td>
              <td>NT$XXX</td>
              <td>
                <FaRegTrashAlt size={22} />
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <div className="row mt-5 container justify-content-between order-detail">
        <div className="col-sm-7 pay-section">
          <h5 className="mb-3 section-name span">選擇送貨及付款方式</h5>
          <div className="container">
            <p className="select-dec">送貨地點</p>
            <select className="form-select">
              <option value="1">送貨地點1</option>
              <option value="2">送貨地點2</option>
              <option value="3">送貨地點3</option>
            </select>
            <p className="select-dec">送貨方式</p>
            <select className="form-select">
              <option value="1">送貨方式1</option>
              <option value="2">送貨方式2</option>
              <option value="3">送貨方式3</option>
            </select>
            <p className="select-dec">付款方式</p>
            <select className="form-select">
              <option value="1">付款方式1</option>
              <option value="2">付款方式2</option>
              <option value="3">付款方式3</option>
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
        <CouponModal
          showCoupon={showCoupon}
          setShowCoupon={setShowCoupon}
          couponHas={couponHas}
          setCouponHas={setCouponHas}
          dataForParent={selectedCouponData}
        />
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

        body {
          position: relative;
        }

        .order-detail {
          margin-inline: 0;
        }

        .spacing {
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
          padding-left: 0.5rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }

        .pay-section {
          border: 1px solid #f5f5f5;
          padding: 0;
        }

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
          padding-block: 2px;
          padding-inline: 6px;
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
