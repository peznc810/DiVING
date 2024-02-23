import React, { useEffect, useState } from 'react'

export default function Home() {
  const [cartData, setCartData] = useState(null)
  const [numArray, setNumArray] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    setCartData(data)

    if (data) {
      const initialNumArray = data.map(
        (item) => item.lesson_num || item.product_num
      )
      setNumArray(initialNumArray)
    }
  }, [])

  const handleIncrement = (index) => {
    console.log(numArray[0])

    setNumArray((prevNumArray) => {
      const updatedNumArray = [...prevNumArray]
      updatedNumArray[index]++
      return updatedNumArray
    })
  }

  const handleDecrement = (index) => {
    setNumArray((prevNumArray) => {
      const updatedNumArray = [...prevNumArray]
      updatedNumArray[index] = Math.max(0, updatedNumArray[index] - 1)
      return updatedNumArray
    })
  }

  return (
    <div className="container">
      <div className="container">
        <div className="section-name d-flex">
          <h5 className="ms-2 span">X項商品</h5>
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
            {cartData ? (
              cartData.map((item, i) => {
                const {
                  lessonName,
                  lessonPrice,
                  lesson_num,
                  productName,
                  productPrice,
                  product_num,
                } = item

                let price =
                  productPrice * product_num || lessonPrice * lesson_num
                return (
                  <tr key={i}>
                    <td>
                      <div className="row">
                        <img />
                        <div>
                          <h5 className="fw-bold text-start">
                            {productName || lessonName}
                          </h5>
                          <p className="imperceptible text-start">商品細節</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h5 className="fw-bold discounted">打折後</h5>
                      <p className="imperceptible text-decoration-line-through">
                        {productPrice || lessonPrice}
                      </p>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => handleIncrement(i)}
                      >
                        +
                      </button>
                      <input
                        type="text"
                        className={`w-25 text-center input${i}`}
                        defaultValue={numArray[i]}
                      />
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => handleDecrement(i)}
                      >
                        -
                      </button>
                    </td>
                    <td>NT${price}</td>
                    <td></td>
                  </tr>
                )
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
