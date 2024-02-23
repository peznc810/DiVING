import React from 'react'
import styles from '../styles.module.scss'
import Image from 'next/image'

export default function Detail() {
  return (
    <>
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion">
            <div className="accordion-header">
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">優惠券</h2>
            </div>
            <div className="accordion-body">
              <div className="filter"></div>
              {/* 這裡之後要再跟成List跟Item的component */}
              <div className="mb-4">
                <div className={`row g-2 ${styles.card}`}>
                  {/* 卡片本體 */}
                  <div className="col-12 col-md-6">
                    <div className=" d-flex border border-info rounded p-3">
                      <div className={`${styles.avatar} flex-shrink-0 me-3`}>
                        <Image
                          src="/images/coupons/turtle.jpg"
                          alt="turtle"
                          fill
                        />
                      </div>
                      <div className="right flex-grow-1">
                        <h4 className="fs-6">新會員</h4>
                        <p>Lorem ipsum dolor sit</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className=" d-flex border border-info rounded p-3">
                      <div className={`${styles.avatar} flex-shrink-0 me-3`}>
                        <Image
                          src="/images/coupons/turtle.jpg"
                          alt="turtle"
                          fill
                        />
                      </div>
                      <div className="right flex-grow-1">
                        <h4 className="fs-6">新會員</h4>
                        <p>Lorem ipsum dolor sit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 頁數按鈕 */}
              <div className="d-flex justify-content-end">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="First group"
                >
                  {/* 要map */}
                  <button
                    type="button"
                    className={`btn btn-outline-secondary btn-sm ${styles['hover-style']}`}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-secondary btn-sm ${styles['hover-style']}`}
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-secondary btn-sm ${styles['hover-style']}`}
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-secondary btn-sm ${styles['hover-style']}`}
                  >
                    4
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
