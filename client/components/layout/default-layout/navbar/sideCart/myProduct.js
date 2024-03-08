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
  const [newNum, setNewNum] = useState(num)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    setCartData(data)
  }, [])

  const handleIncrement = (index) => {
    const updatedCartData = [...cartData]
    updatedCartData[index].num += 1
    setCartData(updatedCartData)
    localStorage.setItem('cart', JSON.stringify(updatedCartData))
    setNewNum(updatedCartData[index].num)
  }

  const handleDecrement = (index) => {
    const updatedCartData = [...cartData]
    if (updatedCartData[index].num > 1) {
      updatedCartData[index].num -= 1
      setCartData(updatedCartData)
      localStorage.setItem('cart', JSON.stringify(updatedCartData))
      setNewNum(updatedCartData[index].num)
    }
  }

  const removeBtn = () => {
    setIsShown(false)

    const newCartData = cartData.filter((item) => {
      return cartData.indexOf(item) !== index
    })

    localStorage.setItem('cart', JSON.stringify(newCartData))
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
                  onClick={() => handleDecrement(index)}
                >
                  <i className="bi bi-dash-lg"></i>
                </button>
                <button type="button" className="btn" disabled>
                  {newNum}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleIncrement(index)}
                >
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
