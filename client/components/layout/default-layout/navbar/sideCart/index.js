import React from 'react'
import Link from 'next/link'
import styles from './index.module.scss'
import MyProduct from './myProduct'

export default function SideCart() {
  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${styles.sideCart}`}
        id="offcanvasCart"
      >
        <div className={`offcanvas-header ${styles.title} py-2 px-3`}>
          <div className={`d-flex justify-content-center`}>
            <i className={`bi bi-bag-fill fs-5 me-2`}></i>
            <p className="m-0 fw-bolder">購物車</p>
          </div>
          {/* 關掉按鈕 */}
          <button
            type="button"
            className={`p-0`}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="bi bi-x-lg fs-4"></i>
          </button>
        </div>

        {/* 購買商品列表 */}
        <div className={`${styles.myProducts}`}>
          {/* 加入商品後會消失 */}
          <p className={`${styles.text}`}>你的購物車是空的</p>
          <MyProduct />
          <MyProduct />
        </div>

        {/* 前往購物車按鈕 */}
        {/* 加入商品後會變成立即結帳 */}
        <Link href={'./cart'} className={`${styles.cartLink}`}>
          開始購物
        </Link>
      </div>
    </>
  )
}
