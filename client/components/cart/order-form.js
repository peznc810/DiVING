import React, { useState } from 'react'

import AutoTab from '@/components/cart/test'
import userData from '@/data/cart/user.json'

//抓取使用者
const user_id = '1'
const [cUser] = userData.filter((v) => {
  return v.user_id === user_id
})

export default function OrderForm({ handleSub, userInputs, setUserInputs }) {
  const payment = 1
  const delivery = 1

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

  return (
    <>
      <div className="container">
        <form onSubmit={handleSub}>
          {delivery === 1 ? (
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
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <p className="fw-bold">收件人電話</p>
                    <input
                      type="text"
                      className="w-100 form-control user_phone"
                      name="user_phone"
                      defaultValue={userInputs.user_phone}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
          ) : (
            <></>
          )}

          <div className="container">
            <div className="w-100 section-name text-center">
              <h5 className="span">訂單備註</h5>
            </div>
            <textarea
              className="form-control spacing"
              rows="5"
              maxLength={50}
              name="order_note"
              defaultValue={userInputs.order_note}
              onChange={handleInputChange}
            ></textarea>
          </div>
          {payment === 2 ? (
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
                    name="cCard_number1"
                    defaultValue={userInputs.cCard_number1}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control autotab-4"
                    maxLength={4}
                    name="cCard_number2"
                    defaultValue={userInputs.cCard_number2}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control autotab-4"
                    maxLength={4}
                    name="cCard_number3"
                    defaultValue={userInputs.cCard_number3}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control autotab-4"
                    maxLength={4}
                    name="cCard_number4"
                    defaultValue={userInputs.cCard_number4}
                    onChange={handleInputChange}
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
                    name="cCard_expirationMonth"
                    placeholder="MM"
                    defaultValue={userInputs.cCard_expirationMonth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control"
                    maxLength={2}
                    name="cCard_expirationYear"
                    placeholder="YY"
                    defaultValue={userInputs.cCard_expirationYear}
                    onChange={handleInputChange}
                  />
                </div>
                <p className="col-2 fw-bold">安全碼</p>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control"
                    maxLength={3}
                    name="cCard_securityCode"
                    defaultValue={userInputs.cCard_securityCode}
                    onChange={handleInputChange}
                  />
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
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <p className="fw-bold">帳單地址</p>
                  <input
                    type="text"
                    className="w-100 form-control cCard_address"
                    name="cCard_address"
                    defaultValue={userInputs.cCard_address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="text-end my-3">
            <button type="submit" className="btn next-step-btn text-white px-5">
              <h5 className="fw-bold py-1 px-3">提交訂單</h5>
            </button>
          </div>
          {/* <div className="container credit-card-section">
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
                  name="cCard_number1"
                  defaultValue={userInputs.cCard_number1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-2">
                <input
                  type="text"
                  className="form-control autotab-4"
                  maxLength={4}
                  name="cCard_number2"
                  defaultValue={userInputs.cCard_number2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-2">
                <input
                  type="text"
                  className="form-control autotab-4"
                  maxLength={4}
                  name="cCard_number3"
                  defaultValue={userInputs.cCard_number3}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-2">
                <input
                  type="text"
                  className="form-control autotab-4"
                  maxLength={4}
                  name="cCard_number4"
                  defaultValue={userInputs.cCard_number4}
                  onChange={handleInputChange}
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
                  name="cCard_expirationMonth"
                  placeholder="MM"
                  defaultValue={userInputs.cCard_expirationMonth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-2">
                <input
                  type="text"
                  className="form-control"
                  maxLength={2}
                  name="cCard_expirationYear"
                  placeholder="YY"
                  defaultValue={userInputs.cCard_expirationYear}
                  onChange={handleInputChange}
                />
              </div>
              <p className="col-2 fw-bold">安全碼</p>
              <div className="col-2">
                <input
                  type="text"
                  className="form-control"
                  maxLength={3}
                  name="cCard_securityCode"
                  defaultValue={userInputs.cCard_securityCode}
                  onChange={handleInputChange}
                />
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
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-6">
                <p className="fw-bold">帳單地址</p>
                <input
                  type="text"
                  className="w-100 form-control cCard_address"
                  name="cCard_address"
                  defaultValue={userInputs.cCard_address}
                  onChange={handleInputChange}
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
          </div> */}
        </form>
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
      </div>
    </>
  )
}
