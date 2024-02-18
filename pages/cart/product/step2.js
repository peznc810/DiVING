import React from 'react'
// import Navbar from '@/components/layout/navbar'
import CartStep from '@/components/cart/cart-step'

export default function Home() {
  return (
    <div className="container">
      <CartStep />

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
            <tr>
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
            </tr>
          </tbody>
        </table>
        <p className="text-end fw-bold my-3">合計: NT$XXX</p>
      </div>
      <div className="container">
        <div className="w-100 section-name text-center">
          <h5 className="span">送貨資料</h5>
        </div>
        <div className="container">
          <div className="d-flex mt-3">
            <input type="checkbox" className=" " />
            <h6 className="fw-bold">收貨人資料與會員資料相同</h6>
          </div>

          <div className="row justify-content-between spacing">
            <div className="col-6">
              <p className="fw-bold">收件人名稱</p>
              <input type="text" className="w-100 form-control" />
            </div>
            <div className="col-6">
              <p className="fw-bold">收件人電話</p>
              <input type="text" className="w-100 form-control" />
            </div>
          </div>
          <p className="fw-bold">配送地址</p>
          <div className="row justify-content-between mb-3">
            <div className="col-3">
              <select className="form-select">
                <option selected>縣/市</option>
                <option value="1">送貨地點1</option>
                <option value="2">送貨地點2</option>
                <option value="3">送貨地點3</option>
              </select>
            </div>
            <div className="col-3">
              <select className="form-select">
                <option selected>區</option>
                <option value="1">送貨地點1</option>
                <option value="2">送貨地點2</option>
                <option value="3">送貨地點3</option>
              </select>
            </div>
            <div className="col-6">
              <input type="text" className="w-100 form-control" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="w-100 section-name text-center">
          <h5 className="span">訂單備註</h5>
        </div>
        <textarea className="form-control spacing" rows="5"></textarea>
      </div>
      <div className="container credit-card-section">
        <div className="w-100 section-name text-center mb-3">
          <h5 className="span">信用卡付款資訊</h5>
        </div>
        <h6 className="span my-3">※ 信用卡交易資訊 Credit Card Information</h6>
        <div className="row justify-content-between my-3">
          <p className="col-sm-2 col-3 fw-bold">信用卡卡號</p>
          <div className="col-2">
            <input type="text" className="form-control" />
          </div>
          <div className="col-2">
            <input type="text" className="form-control" />
          </div>
          <div className="col-2">
            <input type="text" className="form-control" />
          </div>
          <div className="col-2">
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row justify-content-between my-3">
          <p className="col-sm-2 col-3 fw-bold">有效期限</p>
          <div className="col-2">
            <input type="text" className="form-control" />
          </div>
          <div className="col-2">
            <input type="text" className="form-control" />
          </div>
          <p className="col-2 fw-bold">安全碼</p>
          <div className="col-2">
            <input type="text" className="form-control" />
          </div>{' '}
        </div>
        <h6 className="span my-3">※ 持卡人資料 Cardholder Information </h6>
        <div className="d-flex my-3">
          <input type="checkbox" className=" " />
          <h6 className="fw-bold">持卡人資料與會員資料相同</h6>
        </div>
        <div className="row justify-content-between">
          <div className="col-6">
            <p className="fw-bold">持卡人姓名</p>
            <input type="text" className="w-100 form-control" />
          </div>
          <div className="col-6">
            <p className="fw-bold">帳單地址</p>
            <input type="text" className="w-100 form-control" />
          </div>
        </div>
        <div className="text-end my-3">
          <button type="button" className="btn next-step-btn text-white px-5">
            <h5 className="fw-bold py-1 px-3">提交訂單</h5>
          </button>
        </div>
      </div>
      <style jsx>{`
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
            p {
            }
          }
        }
      `}</style>
    </div>
  )
}
