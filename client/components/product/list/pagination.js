import React, { useState, useEffect } from 'react'

export default function Pagination({ product, setProduct }) {
  const perPage = 6
  // 目前頁碼
  const [currentPage, setCurrentPage] = useState(1)
  // 計算總頁數
  const totalPages = Math.ceil(product.length / perPage)

  // 分頁資料
  const paginatedData = product.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  // 換頁處理
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // 初始化時只顯示前六筆資料
  // useEffect(() => {
  //   setCurrentPage(1)
  // }, [product])

  return (
    <>
      <div className="container-1200 pagination-container">
        <nav aria-label="Page navigation example mx-auto">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <a
                className="page-link"
                href="?=page"
                aria-label="Previous"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? 'active' : ''
                }`}
              >
                <a
                  className="page-link"
                  href="?=page"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
            >
              <a
                className="page-link"
                href="?=page"
                aria-label="Next"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <style jsx>
        {`
          .container-1200 {
            max-width: 1200px;
            margin: 0 auto;
            padding: 25px;
          }
          @media screen and (max-width: 576px) {
            .width-1200 {
              width: 380px;
            }
          }
          .pagination-container {
            display: flex;
            justify-content: center;
          }
          .page-item {
            cursor: pointer;
          }
          .page-item.disabled {
            pointer-events: none;
            opacity: 0.5;
          }
          .page-item.active .page-link {
            background-color: #265475;
            color: #fff;
            border-color: #265475;
          }
        `}
      </style>
    </>
  )
}
