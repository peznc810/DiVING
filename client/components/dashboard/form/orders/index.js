import React from 'react'
import styles from '../styles.module.scss'
import Link from 'next/link'
import usePagination from '@/hooks/use-pagination'
import Pagination from '../pagination'

export default function Form({ order = [] }) {
  const { currentPage, pageItem, handlePage, getPageNumbers } = usePagination(
    order,
    5
  )
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
                  {pageItem.map((item) => {
                    return (
                      <tr className="align-middle" key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.created_at}</td>
                        <td>{item.total_price}</td>
                        <td>{item.status}</td>
                        <td>
                          <Link
                            href="/dashboard/orders/order"
                            className="btn btn-secondary btn-sm text-white"
                          >
                            訂單詳情
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
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
