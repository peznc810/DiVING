import React from 'react'
import styles from '../styles.module.scss'
import Link from 'next/link'

export default function Form() {
  return (
    <>
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion">
            <div className="accordion-header">
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">訂單記錄</h2>
            </div>
            <div className="accordion-body overflow-auto">
              <table className="table mb-5">
                <thead className="fs-6">
                  <tr>
                    <th scope="col">訂單編號</th>
                    <th scope="col">訂單日期</th>
                    <th scope="col">合計</th>
                    <th scope="col">訂單狀態</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* 之後改用map */}
                  <tr className="align-middle">
                    <td>20240101</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>
                      <Link
                        href="/dashboard/orders/order"
                        className="btn btn-secondary btn-sm text-white"
                      >
                        訂單詳情
                      </Link>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td>20240101</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>
                      <Link
                        href="/dashboard/orders/order"
                        className="btn btn-secondary btn-sm text-white"
                      >
                        訂單詳情
                      </Link>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td>20240101</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>
                      <Link
                        href="/dashboard/orders/order"
                        className="btn btn-secondary btn-sm text-white"
                      >
                        訂單詳情
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
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
