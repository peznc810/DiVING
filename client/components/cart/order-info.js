import React, { useState, useEffect } from 'react'

import styles from './cart.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function OrderInfo({ cart, finalPrice, discount }) {
  const { totalPrice, deliveryFee } = cart
  return (
    <div className="container">
      <div className={`w-100 text-center ${styles.sectionName}`}>
        <h5 className={`${styles.span}`}>購物車</h5>
      </div>
      <table>
        <thead>
          <tr>
            <th className="col-4 text-start">商品資料</th>
            <th className="col-2">商品價格</th>
            <th className="col-2">數量</th>
            <th className="col-2">小計</th>
          </tr>
        </thead>
        <tbody>
          {cart.items ? (
            cart.items.map((item, i) => {
              const {
                price,
                num,
                name,
                discount_price,
                product_detail,
                order_time,
                subtotal,
                category,
                product_id,
                lesson_id,
                pimg,
                limg,
              } = item
              const detail = product_detail || order_time
              const isProduct = !!item.product_id
              const img = pimg || limg
              const id = product_id || lesson_id
              const imgUrl = isProduct
                ? `/images/product/images/${category}/${id}/${img}`
                : `/images/lesson/${img}`
              const url = isProduct ? `/product/${id}` : `/lesson/${id}`
              return (
                <tr key={i}>
                  <td>
                    <div className="d-flex">
                      <Image src={imgUrl} alt="t" width={100} height={100} />
                      <div className="ms-2">
                        <Link href={url}>
                          <h5 className="fw-bold text-start">{name}</h5>
                        </Link>
                        <p className={`${styles.imperceptible}  text-start`}>
                          {detail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {discount_price ? (
                      <>
                        <h5 className={`fw-bold ${styles.discounted}`}>
                          NT${discount_price}
                        </h5>
                        <p
                          className={`${styles.imperceptible}  text-decoration-line-through`}
                        >
                          NT${price}
                        </p>
                      </>
                    ) : (
                      <>
                        <h5 className="fw-bold">NT${price}</h5>
                      </>
                    )}
                  </td>
                  <td>
                    <span>{num}</span>
                  </td>
                  <td>NT${subtotal}</td>
                </tr>
              )
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <p className="text-end fw-bold my-3">運費: NT${deliveryFee}</p>
      {discount && (
        <p className="text-end fw-bold my-3">折扣: -NT${discount}</p>
      )}

      <p className="text-end fw-bold my-3">
        合計: NT$
        {finalPrice || totalPrice + deliveryFee}
      </p>
      <style jsx>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
        }

        table {
          width: 100%;
        }

        tr {
          border-bottom: 1px solid black;
        }

        td,
        th {
          padding: 1rem 0;
          text-align: center;
        }

        @media screen and (max-width: 576px) {
          h5 {
            font-size: 1rem;
          }
          p {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  )
}
