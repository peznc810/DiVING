import React from 'react'
import Link from 'next/link'

import CartStep from '@/components/cart/cart-step'

import orderDetailData from '@/data/cart/order_detail.json'
import productData from '@/data/cart/product.json'
import lessontData from '@/data/cart/lesson.json'

let data = orderDetailData.filter((item) => {
  return item.order_id === '1'
})

let data2 = data.map((item) => {
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

export default function Home() {
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
          <p className="col text-end">XXXXXXXXXX</p>
        </div>
        <div className="row fw-bold">
          <p className="col-6">商品明細</p>
          <p className="col">數量</p>
          <p className="col  text-end">小計</p>
        </div>
        {data2.map((item, i) => {
          const {
            lessonName,
            lessonPrice,
            lesson_num,
            productName,
            productPrice,
            product_num,
          } = item
          let price = productPrice * product_num || lessonPrice * lesson_num
          totalPrice += price
          return (
            <div className="row" key={i}>
              <p className="col-6 fw-bold">{productName || lessonName}</p>
              <p className="col">{product_num || lesson_num}</p>
              <p className="col text-end">NT${price}</p>
            </div>
          )
        })}
        {/* <div className="row">
          <p className="col-6 fw-bold">AB123 防寒衣 黑 / 女S</p>
          <p className="col">2</p>
          <p className="col text-end">NT$24000</p>
        </div> */}
        <hr />
        <div className="row">
          <p className="col fw-bold">合計</p>
          <p className="col fw-bold text-end">NT$ {totalPrice}</p>
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
