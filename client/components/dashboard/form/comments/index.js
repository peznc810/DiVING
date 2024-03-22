import React, { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

// React icon
import { FaStar } from 'react-icons/fa'

export default function Form({ common = [] }) {
  const maxCount = [0, 1, 2, 3, 4]
  const [rating, setRating] = useState(0)
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
                  {common.map((item) => {
                    return (
                      <tr className="align-middle" key={item.id}>
                        <td className="col-2 d-flex justify-content-center">
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
                        <td className="col-2">{item.name}</td>
                        <td className="col-2">
                          {maxCount.map((index) => {
                            return (
                              <FaStar
                                key={`${item.id}${index}`}
                                color={
                                  index + 1 <= item.score ? 'gold' : 'gray'
                                }
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
