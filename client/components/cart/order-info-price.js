import React from 'react'
import Link from 'next/link'

import styles from './cart.module.scss'

export default function OrderInfoPrice({
  auth,
  cart,
  payment,
  delivery,
  discount,
  totalTotalPrice,
  setShowCoupon,
}) {
  const { totalPrice, deliveryFee } = cart

  return (
    <div className={`col-sm-4 ${styles.orderSection}`}>
      <h5 className={`mb-3 ${styles.sectionName} ${styles.span}`}>訂單資訊</h5>
      <div className="container">
        <div className={`d-flex justify-content-between ${styles.spacing}`}>
          <p className="fw-bold">小計:</p>
          <p>NT$ {totalPrice}</p>
        </div>
        <div className={`d-flex justify-content-between ${styles.spacing}`}>
          <p className="fw-bold">運費:</p>
          <p>NT$ {deliveryFee}</p>
        </div>
        <p className="text-end">優惠 -NT${discount}</p>
        <button
          type="button"
          className={`${styles.couponBtn} p-0 my-2`}
          onClick={() => {
            setShowCoupon(true)
          }}
        >
          選擇優惠券
        </button>
        <hr />
        <div
          className={`d-flex justify-content-between ${styles.spacing} fw-bold`}
        >
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
            className={`btn nextStepBtn w-100 text-white`}
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
        .nextStepBtn {
          background-color: #ff9720;
        }
      `}</style>
    </div>
  )
}
