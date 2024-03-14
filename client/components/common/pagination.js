import { useState } from 'react'
import usePagination from '@/hooks/use-pagination'
import styles from './pagination.module.scss'
// icon
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

export default function Pagination() {
  const {
    currentPage,
    totalPages,
    firstItemIndex,
    prePage,
    nextPage,
    setCurrentPage,
  } = usePagination()
  return (
    <>
      {/* 分頁 */}
      <nav aria-label="Page navigation example ">
        <ul className={`pagination justify-content-center mb-5`}>
          <li
            className={`page-item ${currentPage === 1 ? 'd-none' : 'd-block'}`}
          >
            <button
              className="page-link px-2"
              href="#"
              aria-label="Previous"
              onClick={prePage}
            >
              <span aria-hidden="true">
                <IoIosArrowBack />
              </span>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => {
            return (
              <li key={index} className={`page-item `}>
                <button
                  className={`page-link ${
                    currentPage === index + 1 ? styles.pageBtn : ''
                  }`}
                  type="button"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          })}

          <li className="page-item">
            <button
              className={`page-link px-2 ${
                totalPages === 1 || firstItemIndex < 0 ? 'd-none' : 'd-block'
              }`}
              href="#"
              aria-label="Next"
              onClick={nextPage}
            >
              <span aria-hidden="true">
                <IoIosArrowForward />
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
