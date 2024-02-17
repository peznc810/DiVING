import React from 'react'
import styles from './myProduct.module.scss'

export default function MyProduct() {
  return (
    <>
      <div className={`d-flex p-3 ${styles.myProduct}`}>
        <div className={`me-3 ${styles.productImg}`}>
          <img src="" alt="" />
        </div>
        <div className={`${styles.info}`}>
          <h6 className="m-0">高彈性防寒衣 (連身式)-女</h6>
          <span>黑色, M</span>
          <div className={`d-flex my-2 align-items-center`}>
            <p className={`m-0 me-2 ${styles.specialPrice}`}>NT$350</p>
            <p
              className={`m-0 text-decoration-line-through ${styles.originalPrice}`}
            >
              NT$400
            </p>
          </div>

          <div className={`${styles.btns}`}>
            <div
              className={`btn-group me-2 ${styles.btnGroup}`}
              role="group"
              aria-label="Second group"
            >
              <button type="button" className="btn ">
                <i className="bi bi-dash-lg"></i>
              </button>
              <button type="button" className="btn" disabled>
                1
              </button>
              <button type="button" className="btn ">
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
            <button className={`btn ${styles.delete}`}>移除</button>
          </div>
        </div>
      </div>
    </>
  )
}
