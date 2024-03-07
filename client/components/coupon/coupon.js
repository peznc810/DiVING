import React from 'react'
import Link from 'next/link'
import styles from './coupon.module.scss'

export default function Coupon() {
  return (
    <>
      <div className={`p-4 ${styles.couponBlock}`}>
        <div
          className={`d-flex justify-content-between align-items-center mb-3 ${styles.title}`}
        >
          <h4 className={`fw-bold mb-0 text-light`}>DiVING 新用戶專屬優惠!</h4>
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
        <div
          className={`d-flex align-items-center justify-content-between mb-4 ${styles.content}`}
        >
          <div className={`${styles.info} `}>
            <h5>新客首單享100元優惠</h5>
            <p className={`mb-0`}>註冊新會員，下單即享100元折扣</p>
          </div>
          <div className={`${styles.discount}`}>
            <p className={`mb-0 p-3 text-center`}>
              優惠碼
              <br />
              NEW100
            </p>
          </div>
        </div>
        <Link href={'/user/register'}>領取優惠碼</Link>
      </div>
    </>
  )
}
