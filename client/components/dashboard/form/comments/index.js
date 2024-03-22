import React from 'react'
import styles from '../styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import usePagination from '@/hooks/use-pagination'
import Pagination from '../pagination'

// React icon
import { FaStar } from 'react-icons/fa'

export default function Form({ common = [] }) {
  // 控制分頁
  const { currentPage, pageItem, handlePage, getPageNumbers } = usePagination(
    common,
    2
  )
  // 星星評分
  const maxCount = 5
  const defaultStar = [...Array(maxCount).keys()]

  // 課程和商品分圖片的路徑
  const imgSrc = common.map((item) => {
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
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">我的評論</h2>
            </div>
            <div className="accordion-body overflow-auto">
              <table className="table mb-5">
                <thead className="fs-6">
                  <tr>
                    <th scope="col">圖片</th>
                    <th scope="col">名稱</th>
                    <th scope="col">評價</th>
                    <th scope="col">內容</th>
                    <th scope="col">建立時間</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {pageItem.map((item, index) => {
                    return (
                      <tr className="align-middle" key={item.id}>
                        <td className="col-2 d-flex justify-content-center">
                          <div
                            className={`rounded ${styles.avatar} flex-shrink-0`}
                          >
                            {item.product_id ? (
                              <Image src={imgSrc[index]} alt={item.name} fill />
                            ) : (
                              <Image src={imgSrc[index]} alt={item.name} fill />
                            )}
                          </div>
                        </td>
                        <td className="col-2">{item.name}</td>
                        <td className="col-2">
                          {defaultStar.map((v) => {
                            return (
                              <FaStar
                                key={v}
                                color={v + 1 <= item.score ? 'gold' : 'gray'}
                              />
                            )
                          })}
                        </td>
                        <td className="col-2">{item.comment}</td>
                        <td className="col-2">{item.created_at}</td>
                        <td className="col-2">
                          <Link
                            href="#"
                            className="btn btn-secondary btn-sm text-white"
                          >
                            前往評論
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
