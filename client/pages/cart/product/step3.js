import React from 'react'
// import Navbar from '@/components/layout/navbar'
import CartStep from '@/components/cart/cart-step'

export default function Home() {
  return (
    <div className="container">
      <CartStep />
      <div className="container">
        <div className="w-100 section-name text-center">
          <h5 className="span">訂單資訊</h5>
        </div>
        <div className="row">
          <p className="col fw-bold">訂單編號</p>
          <p className="col text-end">XXXXXXXXXX</p>
        </div>
        <div className="row fw-bold">
          <p className="col-6">商品明細</p>
          <p className="col">數量</p>
          <p className="col  text-end">小計</p>
        </div>
        <div className="row">
          <p className="col-6 fw-bold">AB123 防寒衣 黑 / 女S</p>
          <p className="col">2</p>
          <p className="col text-end">NT$24000</p>
        </div>
        <div className="row">
          <p className="col-6 fw-bold">AB123 防寒衣 黑 / 女S</p>
          <p className="col">1</p>
          <p className="col text-end">NT$12000</p>
        </div>
        <div className="row">
          <p className="col-6 fw-bold">AB123 防寒衣 黑 / 女S</p>
          <p className="col">1</p>
          <p className="col text-end">NT$12000</p>
        </div>
        <hr />
        <div className="row">
          <p className="col fw-bold">合計</p>
          <p className="col fw-bold text-end">NT$48000</p>
        </div>
        <div className="text-end my-3">
          <button type="button" className="btn next-step-btn text-white px-5">
            <h5 className="fw-bold py-1 px-3">返回商場</h5>
          </button>
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
