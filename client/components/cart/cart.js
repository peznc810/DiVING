import React from 'react'
import { FaShoppingCart, FaRegTrashAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useCart } from '@/hooks/cart'

export default function Cart() {
  const { items, updateItemQty, increment, decrement, removeItem } = useCart()

  const MySwal = withReactContent(Swal)

  //刪除通知
  const notifySA = (name, id, isProduct) => {
    MySwal.fire({
      icon: 'question',
      title: <>{`確認要刪除${name}嗎?`}</>,
      showConfirmButton: true,
      confirmButtonText: '確認',
      showDenyButton: true,
      denyButtonText: `取消`,
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '已成功刪除!',
          icon: 'success',
        })
        removeItem(id, isProduct)
      }
    })
  }

  return (
    <div className="container">
      <div className="section-name d-flex">
        <FaShoppingCart size={20} color="#013C64" />
        <h5 className="ms-2 span">{items.length}項商品</h5>
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
          {items ? (
            items.map((item, i) => {
              const {
                product_id,
                lesson_id,
                price,
                num,
                name,
                discount_price,
                product_detail,
                order_time,
              } = item
              const id = product_id || lesson_id
              const detail = product_detail || order_time
              const isProduct = !!item.product_id
              const totalPrice = discount_price
                ? discount_price * num
                : price * num

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
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        decrement(id, isProduct)
                      }}
                    >
                      <i className="bi bi-dash-lg"></i>
                    </button>
                    <input
                      type="text"
                      className={`w-25 text-center input${i}`}
                      value={num}
                      onChange={(e) => {
                        updateItemQty(id, parseInt(e.target.value), isProduct)
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        increment(id, isProduct)
                      }}
                    >
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  </td>
                  <td>
                    <p className={`price${i}`}>NT${totalPrice}</p>
                  </td>
                  <td>
                    <FaRegTrashAlt
                      size={22}
                      onClick={() => notifySA(name, id, isProduct)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                </tr>
              )
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
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

        input {
          background-color: #f8f9fa;
          border: 0;
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
          padding-top: 1rem;
          padding-bottom: 1rem;
          text-align: center;
        }

        .btn-light {
          padding: 2px 6px;
        }

        @media (max-width: 576px) {
          .btn-light {
            padding: 6px;
          }
        }
      `}</style>
    </div>
  )
}
