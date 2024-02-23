import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './index.module.scss'
import MyProduct from './myProduct'

export default function SideCart() {
  const [cartData, setCartData] = useState(null)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    setCartData(data)
  }, [])

  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${styles.sideCart}`}
        id="offcanvasCart"
        data-bs-scroll={true}
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
        <div className={`offcanvas-body ${styles.myProducts}`}>
          {/* 加入商品後會消失 */}
          <p className={`${styles.text}`}>{!cartData && '你的購物車是空的'}</p>
          {cartData &&
            cartData.map((v, i) => {
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
              return (
                <MyProduct
                  key={i}
                  name={lessonName || productName}
                  detail={'detail'}
                  price={lessonPrice || productPrice}
                  discountPrice={123}
                  num={lesson_num || product_num}
                  index={i}
                />
              )
            })}
          {/* <MyProduct
            name={'aaa'}
            detail={'bbb'}
            price={500}
            discountPrice={200}
            num={2}
          /> */}
        </div>

        {/* 前往購物車按鈕 */}
        {/* 加入商品後會變成立即結帳 */}

        {/* <Link {{cartData} ? "./cart" : "./product" } href={'./cart'} className={`${styles.cartLink}`}> */}
        <Link
          href={cartData ? './cart' : './product'}
          className={`${styles.cartLink}`}
        >
          {cartData ? '立即結帳' : '開始購物'}
        </Link>
      </div>
    </>
  )
}
