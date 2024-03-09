import React, { useEffect } from 'react'
import cartData from '@/data/cart/cart.json'
import productData from '@/data/cart/product.json'
import lessontData from '@/data/cart/lesson.json'

let data = cartData.map((item) => {
  for (let i = 0; i < lessontData.length; i++) {
    if (item.lesson_id === lessontData[i].id) {
      item = {
        ...item,
        lessonName: lessontData[i].name,
        lessonPrice: lessontData[i].price,
      }
    }
  }
  for (let i = 0; i < productData.length; i++) {
    if (item.product_id === productData[i].id) {
      item = {
        ...item,
        productName: productData[i].name,
        productPrice: productData[i].price,
        productDiscount: productData[i].discount,
      }
    }
  }
  return item
})

export default function Home() {
  const setLS = () => {
    localStorage.setItem('cart', JSON.stringify(data))
  }

  const consoleLS = () => {
    console.log(localStorage.getItem('cart'))
    console.log(JSON.parse(localStorage.getItem('cart')))
  }

  const clearLS = () => {
    localStorage.clear()
  }

  return (
    <>
      <button onClick={setLS} style={{ height: '500px' }}>
        set LS
      </button>
      <button onClick={consoleLS} style={{ height: '500px' }}>
        console.log LS
      </button>
      <button onClick={clearLS} style={{ height: '500px' }}>
        clear LS
      </button>
    </>
  )
}
