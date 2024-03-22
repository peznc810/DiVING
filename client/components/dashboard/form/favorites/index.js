import React from 'react'
import styles from '../styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

// React icon
import { FaTrashCan } from 'react-icons/fa6'

export default function Form({ fav = {}, auth = {}, delUserFav = () => {} }) {
  // 點擊顯示可使用的優惠券
  const handleCouponValid = () => {
    const validFav = couponHas.filter((coupon) => coupon.valid === 1)
    setCoupon(validCoupon)
  }

  // 點擊顯示已失效的優惠券
  const handleCouponUnValid = () => {
    const unValidCoupon = couponHas.filter((coupon) => coupon.valid === 0)
    setCoupon(unValidCoupon)
  }
  return (
    <>
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion">
            <div className="accordion-header">
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">我的收藏</h2>
            </div>
            <div className="accordion-body overflow-auto">
              {/* 篩選＆搜尋，要再調整 */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <button type="button" className="btn btn-sm text-secondary">
                    全部
                  </button>
                  |
                  <button type="button" className="btn btn-sm">
                    商品
                  </button>
                  |
                  <button type="button" className="btn btn-sm">
                    課程
                  </button>
                </div>
              </div>
              <table className="table mb-5">
                <thead className="fs-6">
                  <tr>
                    <th scope="col">圖片</th>
                    <th scope="col">名稱</th>
                    <th scope="col">價格</th>
                    <th scope="col">查看</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* 之後改用map */}
                  {fav.map((item) => {
                    return (
                      <tr className="align-middle" key={item.id}>
                        <td className="d-flex justify-content-center">
                          <div
                            className={`rounded ${styles.avatar} flex-shrink-0`}
                          >
                            <Image
                              src="/images/coupons/turtle.jpg"
                              alt="turtle"
                              fill
                            />
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>
                          <Link
                            href="http://localhost:3000/lesson/1"
                            className="btn btn-secondary btn-sm text-white"
                          >
                            商品詳情
                          </Link>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => {
                              delUserFav(auth.id, item.id)
                            }}
                          >
                            <FaTrashCan />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                {/* page要做成component */}
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
