import React from 'react'
import styles from '../styles.module.scss'

export default function Form() {
  return (
    <>
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion">
            <div className="accordion-header">
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">訂單資訊</h2>
            </div>
            <div className="accordion-body">
              <table className="table mb-4">
                <thead className="fs-6">
                  <tr>
                    <th scope="col">訂單編號</th>
                    <th scope="col">訂單日期</th>
                    <th scope="col">合計</th>
                    <th scope="col">訂單狀態</th>
                    <th scope="col">訂單詳情</th>
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
                      <button
                        type="submit"
                        className="btn btn-secondary text-white"
                      >
                        訂單詳情
                      </button>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td>20240102</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>
                      <button
                        type="submit"
                        className="btn btn-secondary text-white"
                      >
                        訂單詳情
                      </button>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td>20240103</td>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    <td>
                      <button
                        type="submit"
                        className="btn btn-secondary text-white"
                      >
                        訂單詳情
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="First group"
                >
                  <button
                    type="button"
                    className={`btn btn-outline-secondary ${styles['hover-style']}`}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-secondary ${styles['hover-style']}`}
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-secondary ${styles['hover-style']}`}
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-secondary ${styles['hover-style']}`}
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
