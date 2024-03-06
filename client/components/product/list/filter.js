import { useMemo, useEffect, useState } from 'react'

import Link from 'next/link'
import { MdScubaDiving } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlinePriceCheck } from "react-icons/md";

export default function Filter({product, setProduct}) {
  const [buttonStyles, setButtonStyles] = useState({
    brand: '',
    category: '',
    price: ''
  });
  const [nowSort, setNowSort] = useState('');
  
  useEffect(() => { 
    fetch("http://localhost:3000/api/product").then((res) => {
        return res.json()
    }).then((data)=> setProduct(data))
  }, [])

  const items = useMemo(() => {
    if (!product) return [];
    return product.data
  }, [product])

  const handleButtonClick = (buttonName) => {
    setButtonStyles({
      ...buttonStyles,
      [buttonName]: buttonStyles[buttonName] ? '' : 'active'
    });
  }

  const sortClick = (value) => {
    setNowSort(value);
    setProduct(value);
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
                  {items.map((product) => {
                    const firstMapping = items.find((p) => p.brand === product.brand) === product;
                    if (firstMapping) {
                      return (
                        <div key={product.id} className="form-check">
                          <Link
                            href={`/product/sort/${product.brand}`}
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                            style={{ color: '#303132' }}
                            onClick={sortClick}
                          >
                            {product.brand}
                          </Link>
                        </div>
                      );
                    }
                    return null;
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
                  {items.map((product) => {
                    const firstMapping = items.find((p) => p.category === product.category) === product;
                    if(firstMapping){
                      return (
                        <div key={product.id} className="form-check">
                          <Link
                            href={`/product/sort/${product.category}`}
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                            style={{ color: '#303132' }}
                            onClick={sortClick}
                          >
                            {product.category}
                          </Link>
                        </div>
                      );
                    }
                    return null;
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
                  <label className="form-check-label" htmlFor="flexCheckDefault">
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
                  <label className="form-check-label" htmlFor="flexCheckChecked">
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
                  <label className="form-check-label" htmlFor="flexCheckChecked">
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
                  <label className="form-check-label" htmlFor="flexCheckChecked">
                    $6,00
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
