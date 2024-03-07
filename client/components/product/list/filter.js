import { useMemo, useEffect, useState } from 'react'

import Link from 'next/link'
import { MdScubaDiving } from 'react-icons/md'
import { MdOutlineCategory } from 'react-icons/md'
import { MdOutlinePriceCheck } from 'react-icons/md'

export default function Filter({ product, setProduct }) {
  console.log(product)
  const [buttonStyles, setButtonStyles] = useState({
    brand: '',
    category: '',
    price: '',
  })

  // 去除重複的分類
  const brand = useMemo(() => {
    const uniqueBrand = new Set(product.map((v) => v.brand))
    return Array.from(uniqueBrand)
  }, [product])
  // console.log(brand)

  const category = useMemo(() => {
    const uniqueCategory = new Set(product.map((v) => v.category))
    return Array.from(uniqueCategory)
  }, [product])
  //console.log(category)

  const handleButtonClick = (buttonName) => {
    setButtonStyles({
      ...buttonStyles,
      [buttonName]: buttonStyles[buttonName] ? '' : 'active',
    })
  }

  return (
    <>
      <div className="my-4">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {/* 品牌 */}
          <div className="accordion-item">
            <h4 className="accordion-header">
              <button
                className={`accordion-button collapsed ${buttonStyles.brand}`}
                type="button"
                data-bs-toggle="collapse"
                aria-expanded="false"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-controls="panelsStayOpen-collapseOne"
                onClick={() => handleButtonClick('brand')}
              >
                <MdScubaDiving className="m-1" /> 品牌
              </button>
            </h4>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body px-1">
                <div className="form-check">
                  {brand.map((v) => {
                    return (
                      <div key={v} className="form-check">
                        <Link
                          href={`/product/sort/${v}`}
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                          style={{ color: '#303132' }}
                          // onClick={sortClick}
                        >
                          {v}
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 商品類別 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button collapsed ${buttonStyles.category}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
                onClick={() => handleButtonClick('category')}
              >
                <MdOutlineCategory className="m-1" /> 商品類別
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body px-1">
                <div className="form-check">
                  {category.map((v) => {
                    return (
                      <div key={v} className="form-check">
                        <Link
                          href={`/product/sort/${v}`}
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                          style={{ color: '#303132' }}
                          // onClick={sortClick}
                        >
                          {v}
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 價格篩選 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button collapsed ${buttonStyles.price}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseThree"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseThree"
                onClick={() => handleButtonClick('price')}
              >
                <MdOutlinePriceCheck className="m-1" /> 價格篩選
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseThree"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body px-1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    $1,000以下
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    $1,001 - $3,500
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    $3,501 - $6,500
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    $6,500以上
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
