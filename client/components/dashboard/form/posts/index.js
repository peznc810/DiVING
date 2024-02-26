import React from 'react'
import styles from '../styles.module.scss'
import Link from 'next/link'

// React icon
import { FaTrashCan } from 'react-icons/fa6'
import { MdOutlineLibraryAdd } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'

export default function Form() {
  return (
    <>
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion">
            <div className="accordion-header">
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">我的文章</h2>
            </div>
            <div className="accordion-body overflow-auto">
              <table className="table mb-5">
                <thead className="fs-6">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">文章標題</th>
                    <th scope="col">發佈日期</th>
                    <th scope="col">
                      <Link
                        href="/dashboard/posts/newpost"
                        className="text-black"
                      >
                        <MdOutlineLibraryAdd />
                        <span className="small ms-1">新增</span>
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* 之後改用map */}
                  <tr className="align-middle">
                    <td>1</td>
                    <td>
                      <Link
                        href="#"
                        className={`text-black ${styles['text-hover']}`}
                      >
                        潛水攝影的光影之旅
                      </Link>
                    </td>
                    <td>2024/03/26 14:00</td>
                    <td>
                      <a href="/dashboard/posts/edit" className="btn">
                        <FaEdit />
                      </a>
                      <button type="button" className="btn">
                        <FaTrashCan />
                      </button>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td>1</td>
                    <td>
                      <Link
                        href="#"
                        className={`text-black ${styles['text-hover']}`}
                      >
                        潛水攝影的光影之旅
                      </Link>
                    </td>
                    <td>2024/03/26 14:00</td>
                    <td>
                      <a href="/dashboard/posts/edit" className="btn">
                        <FaEdit />
                      </a>
                      <button type="button" className="btn">
                        <FaTrashCan />
                      </button>
                    </td>
                  </tr>
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
