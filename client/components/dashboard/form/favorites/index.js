import React from 'react'
import styles from '../styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import usePagination from '@/hooks/use-pagination'
import Pagination from '../pagination'

// React icon
import { FaTrashCan } from 'react-icons/fa6'

export default function Form({ fav = {}, auth = {}, delUserFav = () => {} }) {
  // 控制分頁
  const { currentPage, pageItem, handlePage, getPageNumbers } = usePagination(
    fav,
    10
  )

  const imgSrc = pageItem.map((item) => {
    if (item.product_id) {
      const template = `/images/product/images/${item.product_category}/${item.product_id}/${item.img}`
      return template
    } else {
      const fileName = item.img.split(',', 1) + '.jpg'
      const template = `/images/lesson/${fileName}`
      return template
    }
  })
  return (
    <>
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion">
            <div className="accordion-header">
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">我的收藏</h2>
            </div>
            <div className="accordion-body overflow-auto">
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
                <tbody className="position-relative">
                  {/* 之後改用map */}
                  {pageItem.length <= 0 ? (
                    <div
                      className={`fs-4 position-absolute end-50 mt-4 ms-4`}
                      style={{ color: '#b4b4b4' }}
                    >
                      尚無資料
                    </div>
                  ) : (
                    pageItem.map((item, index) => {
                      return (
                        <tr className="align-middle" key={item.id}>
                          <td className="d-flex justify-content-center">
                            <div
                              className={`rounded ${styles.avatar} flex-shrink-0`}
                            >
                              <Image src={imgSrc[index]} alt="turtle" fill />
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
