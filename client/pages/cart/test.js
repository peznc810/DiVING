import React from 'react'
import { useCart } from '@/hooks/cart'

export default function Home() {
  const { addItem } = useCart()

  const addProduct = (
    product_id,
    product_detail,
    name,
    price,
    discount_price,
    num
  ) => {
    const item = {
      product_id,
      product_detail,
      name,
      price,
      discount_price,
      num,
    }
    addItem(item)
  }

  const addLesson = (lesson_id, order_time, name, price, num) => {
    const item = {
      lesson_id,
      order_time,
      name,
      price,
      num,
    }
    addItem(item)
  }

  return (
    <div className="container">
      <button
        onClick={() => {
          addProduct(1, '黑/M', '名稱', 250, 200, 1)
        }}
      >
        P1
      </button>
      <button
        onClick={() => {
          addProduct(5, '5細節', '5名稱', 100, null, 1)
        }}
      >
        P5
      </button>
      <button
        onClick={() => {
          addLesson(5, '細節', '名稱', 1000, 1)
        }}
      >
        L5
      </button>
    </div>
  )
}
