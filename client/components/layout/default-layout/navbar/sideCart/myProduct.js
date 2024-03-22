import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './myProduct.module.scss'

import { useCart } from '@/hooks/cart'

export default function MyProduct({
  name = '',
  detail = '',
  price = 0,
  discountPrice = 0,
  num = 0,
  isProduct,
  id,
  img,
  category,
}) {
  const { increment, decrement, removeItem } = useCart()
  let url = isProduct ? `/images/product/images/${category}/${id}/${img}` : ''

  return (
    <>
      <div className={`d-flex p-3 ${styles.myProduct}`}>
        <div className={`me-3 ${styles.productImg}`}>
          <Image src={url} alt="t" width={75} height={75} />
        </div>
        <div className={`${styles.info}`}>
          <h6 className="m-0">{name}</h6>
          <span>{detail}</span>
          <div className={`d-flex my-2 align-items-center`}>
            {discountPrice ? (
              <>
                <p className={`m-0 me-2 ${styles.specialPrice}`}>
                  NT${discountPrice}
                </p>
                <p
                  className={`m-0 text-decoration-line-through ${styles.originalPrice}`}
                >
                  NT${price}
                </p>
              </>
            ) : (
              <>
                <p className={`m-0 ${styles.originalPrice}`}>NT${price}</p>
              </>
            )}
          </div>

          <div className={`${styles.btns}`}>
            <div
              className={`btn-group me-2 ${styles.btnGroup}`}
              role="group"
              aria-label="Second group"
            >
              <button
                type="button"
                className="btn"
                onClick={() => {
                  decrement(id, isProduct)
                }}
              >
                <i className="bi bi-dash-lg"></i>
              </button>
              <button type="button" className="btn" disabled>
                {num}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  increment(id, isProduct)
                }}
              >
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
            <button
              className={`btn ${styles.delete}`}
              onClick={() => {
                removeItem(id, isProduct)
              }}
            >
              移除
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
