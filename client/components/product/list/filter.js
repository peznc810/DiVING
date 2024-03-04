import { useMemo, useEffect, useState } from 'react'

import Link from 'next/link'

import { MdScubaDiving } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlinePriceCheck } from "react-icons/md";

export default function Filter() {
  const [product, setProduct] = useState(null);
  // const [ifButtonOnclick, setIfButtonOnclick] = useState(null);
  
  useEffect(() => { 
    fetch("http://localhost:3000/api/product").then((res) => {
        return res.json()
    }).then((data)=> setProduct(data))
  }, [])

  const items = useMemo(() => {
    if (!product) return [];
    return product.data
  }, [product])
  console.log(items)


  // const filterButtonClick = () => {
  //   setIfButtonOnclick(!ifButtonOnclick);
  // }
  return (
    <>
        <div className="my-4"> 
            <div
            className="accordion accordion-flush"
            id="accordionFlushExample"
          >
            {/* 品牌 */}
            <div className="accordion-item">
              <h4 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  <MdScubaDiving className="m-2" /> 品牌
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
                            href="/product/list"
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                            style={{ color: '#303132' }}
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
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  <MdOutlineCategory className="m-2" /> 商品類別
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body px-1">
                  <div  className="form-check">
                    {items.map((product) => {
                      const firstMapping = items.find((p) => p.category === product.category) === product;
                      if(firstMapping){
                        return (
                          <div key={product.id} className="form-check">
                            <Link
                              href="/product/list"
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                              style={{ color: '#303132' }}
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
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  <MdOutlinePriceCheck className="m-2" /> 價格篩選
                </button>
              </h2>
            </div>
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
                    $5,000以下
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
                    $5,001 - $9,999
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
                    $10,000
                  </label>
                </div>
            
            
            

          </div>
            </div>

          </div>
        </div>
          



          {/* 品牌 */}
            {/* <div className="accordion-item">
              <h4 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                  <MdScubaDiving className="m-2" /> 品牌
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
                        href="/product/list"
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                        style={{ color: '#303132' }}
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
            </div> */}

            {/* 商品類別 */}
            {/* <div className="accordion-item">
              <h2 className="accordion-header">
              <button
                  className="accordion-button collapsed "
                  type="button"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  <MdOutlineCategory className="m-2" /> 商品類別
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body px-1">
                  <div  className="form-check">
                  {items.map((product) => {
                    const firstMapping = items.find((p) => p.category === product.category) === product;
                    if(firstMapping){
                      return (
                        <div key={product.id} className="form-check">
                          <Link
                            href="/product/list"
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                            style={{ color: '#303132' }}
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
            </div> */}

            {/* 價格篩選 */}
            {/* <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed "
                  type="button"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                <MdOutlinePriceCheck className="m-2" /> 價格篩選
                </button>
              </h2>
            </div>
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
                    $5,000以下
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
                    $5,001 - $9,999
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
                    $10,000
                  </label>
                </div>
              </div>
            </div> */}
       
    </>
  )
}
