import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import CartStep from '@/components/cart/cart-step'
import AutoTab from '@/components/cart/test'
import userData from '@/data/cart/user.json'

const user_id = '1'
const [cUser] = userData.filter((v) => {
  return v.user_id === user_id
})

export default function Home() {
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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    setCartData(data)
  }, [])

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
    console.log(name)
    console.log(value)
    setUserInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const checkFormat = () => {
    // if (true) {
    //   return true
    // } else {
    //   return false
    // }
  }

  let totalPrice = 0

  const handleBtnSubmit = (e) => {
    const now = new Date()
    const created_at = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    const order = {
      id: 1,
      total: totalPrice,
      user_id: cUser.user_id,
      address: `${userInputs.user_city}${userInputs.user_section}${userInputs.user_road}`,
      created_at: created_at,
      status: '訂單成立',
      phone: cUser.phone,
      recipient: userInputs.cCard_name,
      bill_address: userInputs.cCard_address,
      order_note: userInputs.order_note,
    }
    e.preventDefault()
    if (checkFormat()) {
      console.log('true')
    } else if (!checkFormat()) {
      console.log('false')
    }
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
                value={userInputs.user_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <p className="fw-bold">收件人電話</p>
              <input
                type="text"
                className="w-100 form-control user_phone"
                name="user_phone"
                value={userInputs.user_phone}
                pattern="/^09\d{8}$/"
                onChange={handleInputChange}
                // onBlur={checkFormat}
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
                <option value="0">縣/市</option>
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
                <option value="0">區</option>
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
        <h6 className="span my-3">※ 信用卡交易資訊 Credit Card Information</h6>
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
              value={userInputs.cCard_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-6">
            <p className="fw-bold">帳單地址</p>
            <input
              type="text"
              className="w-100 form-control cCard_address"
              name="cCard_address"
              value={userInputs.cCard_address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="text-end my-3">
          <Link href="./step3" passHref>
            <button
              type="button"
              className="btn next-step-btn text-white px-5"
              onClick={(e) => {
                handleBtnSubmit(e)
              }}
            >
              <h5 className="fw-bold py-1 px-3">提交訂單</h5>
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
    </div>
  )
}
