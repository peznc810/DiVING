import { useEffect, useState } from 'react'

import { MdScubaDiving } from 'react-icons/md'
import { MdOutlineCategory } from 'react-icons/md'
import { MdOutlinePriceCheck } from 'react-icons/md'
import { TbSettingsX } from 'react-icons/tb'

export default function Filter({ setFilterSettings, clearSettings }) {
  const [buttonStyles, setButtonStyles] = useState({
    brand: '',
    category: '',
    price: '',
  })

  const allBrand = [
    'ADISI',
    'Unidive',
    'AROPEC',
    'EXQUIS',
    'PrincetonTec',
    'MYSTIC',
    'HeleiWaho',
    'OceanMax',
  ]

  const allCategory = ['防寒衣', '面鏡', '呼吸管', '蛙鞋', '配件']

  //價格篩選
  const [priceFilter, setPriceFilter] = useState({
    $1000以下: false,
    '$1001-$3500': false,
    '$3501-$6500': false,
    $6501以上: false,
  })

  //css樣式
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
                  {allBrand.map((v) => {
                    return (
                      <div
                        key={v}
                        className="form-check"
                        onClick={() => {
                          setFilterSettings((c) => ({
                            ...c,
                            brand: v,
                          }))
                        }}
                      >
                        <div
                          // href="?=brand"
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                          style={{ color: '#303132' }}
                        >
                          {v}
                        </div>
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
                  {allCategory.map((v) => {
                    return (
                      <div
                        key={v}
                        className="form-check"
                        onClick={() => {
                          setFilterSettings((c) => ({
                            ...c,
                            category: v,
                          }))
                        }}
                      >
                        <div
                          href={`/product/${v}`}
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                          style={{ color: '#303132' }}
                        >
                          {v}
                        </div>
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
              <div className="accordion-body ">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={() => {
                      setFilterSettings((c) => ({
                        ...c,
                        price: '$1000以下',
                      }))
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    $1,000以下
                  </label>
                </div>

                <div className="form-check my-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    onChange={() => {
                      setFilterSettings((c) => ({
                        ...c,
                        price: '$1001-$3500',
                      }))
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    $1,001 - $3,500
                  </label>
                </div>

                <div className="form-check my-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    onChange={() => {
                      setFilterSettings((c) => ({
                        ...c,
                        price: '$3501-$6500',
                      }))
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    $3,501 - $6,500
                  </label>
                </div>
                <div className="form-check my-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    onChange={() => {
                      setFilterSettings((c) => ({
                        ...c,
                        price: '$6501以上',
                      }))
                    }}
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
          {/* 清除按鍵 */}

          <div className="my-3 col text-center">
            <button
              className="btn btn-primary clear-settings"
              onClick={clearSettings}
            >
              Clear Settings <TbSettingsX className="TbSettingsX" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
