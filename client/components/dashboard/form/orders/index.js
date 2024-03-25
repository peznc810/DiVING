import React from 'react'
import styles from '../styles.module.scss'
import usePagination from '@/hooks/use-pagination'
import Pagination from '../pagination'

export default function Form({ order = [] }) {
  const { currentPage, pageItem, handlePage, getPageNumbers } = usePagination(
    order,
    10
  )
  console.log(pageItem)
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
                <tbody className="position-relative">
                  {/* 之後改用map */}
                  {pageItem.length <= 0 ? (
                    <div
                      className="position-absolute end-50 top-50 mt-4 ms-4 fs-4"
                      style={{ color: '#b4b4b4' }}
                    >
                      尚無資料
                    </div>
                  ) : (
                    pageItem.map((item) => {
                      return (
                        <tr className="align-middle" key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.created_at}</td>
                          <td>{item.total_price}</td>
                          <td>{item.status}</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
              {/* 頁數按鈕 */}

              <Pagination
                currentPage={currentPage}
                handlePage={handlePage}
                getPageNumbers={getPageNumbers}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
