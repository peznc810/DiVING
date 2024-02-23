import React, { useEffect, useState } from 'react'
import styles from './myProduct.module.scss'
import { indexOf } from 'lodash'
import { actionAsyncStorage } from 'next/dist/client/components/action-async-storage.external'

export default function MyProduct({
  index = -1,
  name = '',
  detail = '',
  price = 0,
  discountPrice = 0,
  num = 0,
}) {
  const [cartData, setCartData] = useState(null)
  const [isShown, setIsShown] = useState(true)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    setCartData(data)
  }, [])

  console.log(cartData)

  const removeBtn = () => {
    console.log('按下了移除按鈕')
    setIsShown(false)

    const a = cartData.filter((item) => {
      return cartData.indexOf(item) !== index
    })

    localStorage.setItem('cart', JSON.stringify(a))
  }

  return (
    <>
      {isShown && (
        <div className={`d-flex p-3 ${styles.myProduct}`}>
          <div className={`me-3 ${styles.productImg}`}>
            <img src="" alt="" />
          </div>
          <div className={`${styles.info}`}>
            <h6 className="m-0">{name}</h6>
            <span>{detail}</span>
            <div className={`d-flex my-2 align-items-center`}>
              <p className={`m-0 me-2 ${styles.specialPrice}`}>
                NT${discountPrice}
              </p>
              <p
                className={`m-0 text-decoration-line-through ${styles.originalPrice}`}
              >
                NT${price}
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
                  {num}
                </button>
                <button type="button" className="btn ">
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
              <button className={`btn ${styles.delete}`} onClick={removeBtn}>
                移除
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
