import React from 'react'

export default function Pagination() {
  return (
    <>
      <div className="container-1200 pagination-container">
        <nav aria-label="Page navigation example mx-auto">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
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
        `}
      </style>
    </>
  )
}
