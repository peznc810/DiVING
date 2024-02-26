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
              {/* 篩選＆搜尋，要再調整 */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm text-secondary">全部</button>|
                  <button className="btn btn-sm">可使用</button>|
                  <button className="btn btn-sm">已使用</button>
                </div>
                <div className="d-flex justify-content-end">
                  <input type="text" className="form-control w-50 h-50 me-2" />
                  <button
                    className={`btn btn-sm btn-outline-secondary ${styles['hover-style']}`}
                  >
                    領取
                  </button>
                </div>
              </div>
              {/* 這裡之後要再跟成List跟Item的component */}
              <div className="mb-5">
                <div className={`row g-3 ${styles.card}`}>
                  {/* 卡片本體 */}
                  <div className="col-12 col-md-6">
                    <div className=" d-flex border border-info rounded p-3 h-100">
                      <div
                        className={`rounded ${styles.avatar} flex-shrink-0 me-3`}
                      >
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
                    <div className=" d-flex border border-info rounded p-3 h-100">
                      <div
                        className={`rounded ${styles.avatar} flex-shrink-0 me-3`}
                      >
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
              <div className="d-flex justify-content-center">
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
