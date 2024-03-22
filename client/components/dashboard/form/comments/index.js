import React, { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

// React icon
import { FaStar } from 'react-icons/fa'

export default function Form({ common = [] }) {
  const [category, setCategory] = useState([])

  useEffect(() => {
    setCategory(common)
  }, [common])
  return (
    <>
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion">
            <div className="accordion-header">
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">我的評論</h2>
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
                    <th scope="col">評價</th>
                    <th scope="col">內容</th>
                    <th scope="col">建立時間</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {common.map((item) => {
                    return (
                      <tr className="align-middle" key={item.id}>
                        <td className="d-flex justify-content-center">
                          <div
                            className={`rounded ${styles.avatar} flex-shrink-0`}
                          >
                            {item.product_id ? (
                              <Image
                                src={`/images/product/images/${item.product_category}/${item.product_id}/${item.img}`}
                                alt={item.name}
                                fill
                              />
                            ) : (
                              <Image
                                src={`/image/users/unKnow.jpg`}
                                alt={item.name}
                                fill
                              />
                            )}
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>
                          {/* 改成map */}
                          <FaStar className="text-secondary" />
                          <FaStar className="text-secondary" />
                          <FaStar className="text-secondary" />
                          <FaStar className="text-secondary" />
                          <FaStar className="text-secondary" />
                        </td>
                        <td>{item.comment}</td>
                        <td>{item.created_at}</td>
                        <td>
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
