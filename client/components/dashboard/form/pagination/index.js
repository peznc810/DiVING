import React from 'react'
import styles from '../styles.module.scss'

export default function Pagination({
  currentPage = 0,
  handlePage = () => {},
  getPageNumbers = () => {},
}) {
  return (
    <div className="d-flex justify-content-center">
      {/* page要做成component */}
      <div className="btn-group" role="group" aria-label="First group">
        {/* 要map */}
        {getPageNumbers().map((pageNum) => {
          return (
            <button
              key={pageNum}
              type="button"
              className={`btn btn-outline-secondary btn-sm ${styles['hover-style']}`}
              onClick={() => {
                handlePage(pageNum)
              }}
              disabled={pageNum === currentPage}
            >
              {pageNum}
            </button>
          )
        })}
      </div>
    </div>
  )
}
