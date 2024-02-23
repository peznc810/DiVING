import React, { useEffect } from 'react'
// import Navbar from '@/components/layout/navbar'
import { FaShoppingCart } from 'react-icons/fa'
import { FaRegTrashAlt } from 'react-icons/fa'
import CartStep from '@/components/cart/cart-step'

import cartData from '@/data/cart/cart.json'
import productData from '@/data/cart/product.json'
import lessontData from '@/data/cart/lesson.json'

let data = cartData.map((item) => {
  for (let i = 0; i < lessontData.length; i++) {
    if (item.lesson_id === lessontData[i].id) {
      item = {
        ...item,
        lessonName: lessontData[i].name,
        lessonPrice: lessontData[i].price,
      }
    }
  }
  for (let i = 0; i < productData.length; i++) {
    if (item.product_id === productData[i].id) {
      item = {
        ...item,
        productName: productData[i].name,
        productPrice: productData[i].price,
      }
    }
  }
  return item
})

console.log(data)

export default function Home() {
  let totalPrice = 0
  let deliveryFee = 50
  let discount = 0
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(data))
  })
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
            {data.map((v, i) => {
              const {
                lessonName,
                lessonPrice,
                lesson_id,
                lesson_num,
                productName,
                productPrice,
                product_id,
                product_num,
              } = v
              let price = productPrice * product_num || lessonPrice * lesson_num
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
                    <h5 className="fw-bold discounted">打折後</h5>
                    <p className="imperceptible text-decoration-line-through">
                      {productPrice || lessonPrice}
                    </p>
                  </td>
                  <td>
                    <button type="button" className="btn btn-light">
                      +
                    </button>
                    <input
                      type="text"
                      className="w-25 text-center"
                      defaultValue={product_num || lesson_num}
                    />
                    <button type="button" className="btn btn-light">
                      -
                    </button>
                  </td>
                  <td>NT${price}</td>
                  <td>
                    <FaRegTrashAlt size={22} />
                  </td>
                </tr>
              )
            })}
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
            <a>優惠券</a>
            <hr />
            <div className="d-flex justify-content-between spacing fw-bold">
              <p>合計:</p>
              <p>NT$ {totalPrice + deliveryFee - discount}</p>
            </div>
            <button
              type="button"
              className="btn next-step-btn w-100 text-white"
            >
              <h5 className="fw-bold py-1">前往結帳</h5>
            </button>
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
