import React from 'react'
import styles from './myProduct.module.scss'

export default function MyProduct() {
  return (
    <>
      <div className={`d-flex p-3 ${styles.myProduct}`}>
        <div className={`me-3 ${styles.productImg}`}>
          <img src="" alt="" />
        </div>
        <div>
          <h5>高彈性防寒衣 (連身式)-女</h5>
          <span>黑色, M</span>
          <div className={`d-flex`}>
            <p>優惠價</p>
            <p>原價</p>
          </div>

          <div className={`${styles.btnGroup}`}>
            <div className="btn-group me-2" role="group" aria-label="Second group">
              <button type="button" className="btn p-1">
                <i className="bi bi-dash-lg"></i>
              </button>
              <button type="button" className="btn py-1 px-2">
                1
              </button>
              <button type="button" className="btn p-1">
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
            <button className={`${styles.delete}`}>移除</button>
          </div>
        </div>
      </div>
    </>
  )
}
