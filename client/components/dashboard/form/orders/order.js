import React from 'react'
import styles from '../styles.module.scss'
import Link from 'next/link'

export default function Form() {
  return (
    <>
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion">
            <div className="accordion-header">
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">訂單詳情</h2>
            </div>
            <div className="accordion-body overflow-auto">
              {/* 從這裡開始 */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
