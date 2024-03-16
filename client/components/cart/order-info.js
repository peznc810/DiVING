import React, { useState, useEffect } from 'react'

export default function OrderInfo({ cart, finalPrice, discount }) {
  const { totalPrice, deliveryFee } = cart
  return (
    <div className="container">
      <div className="w-100 text-center section-name">
        <h5 className="span">購物車</h5>
      </div>
      <table>
        <thead>
          <tr>
            <th className="col-4 text-start">商品資料</th>
            <th className="col-2">商品價格</th>
            <th className="col-2">數量</th>
            <th className="col-2">小計</th>
            <th className="col-2"></th>
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
              } = item
              const detail = product_detail || order_time
              return (
                <tr key={i}>
                  <td>
                    <div className="row">
                      <img />
                      <div>
                        <h5 className="fw-bold text-start">{name}</h5>
                        <p className="imperceptible text-start">{detail}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {discount_price ? (
                      <>
                        <h5 className="fw-bold discounted">
                          NT${discount_price}
                        </h5>
                        <p className="imperceptible text-decoration-line-through">
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

        .span {
          color: #013c64;
          font-weight: bold;
        }

        .discounted {
          color: #dc5151;
        }

        .imperceptible {
          color: #858585;
        }

        .section-name {
          background-color: #f5f5f5;
          padding: 0.5rem;
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
      `}</style>
    </div>
  )
}
