import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Stars from '@/components/product/star/star'
import Carousel from '@/components/product/carousel'
import Switch from '@/components/product/detail/switch'
import ProductRecommond from '@/components/product/detail/product-recommond'
import Link from 'next/link'

import styles from '@/components/product/product.module.css'

export default function Detail() {
  const router = useRouter()
  const { pid } = router.query
  const [product, setProduct] = useState(null)

  const [selectColor, setSelectColor] = useState(null)
  const [selectSize, setSelectSize] = useState(null)

  useEffect(() => {
    if (!pid) return
    fetch(`http://localhost:3000/api/product/${pid}`)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setProduct(res.data)
      })
  }, [pid])

  // 增加數量，回傳新的陣列，符合id的商品數量+1
  const increment = (products, id) => {
    return product.map((v, i) => {
      if (v.id === id) return { ...v, count: v.count + 1 }
      else return v
    })
  }

  // 減少數量，回傳新的陣列，符合id的商品數量-1
  const decrement = (products, id) => {
    return product.map((v, i) => {
      if (v.id === id) return { ...v, count: v.count - 1 }
      else return v
    })
  }

  if (!product) return null  
  return (
    <>
      <div className="container-1200">
        {/* 麵包屑 */}
        <div className="my-3 d-flex mt-5">
          <div className="d-flex align-items-center">
            <Link
              href="/product/list"
              className="p-2"
              style={{ color: '#303132' }}
            >
              <i class="bi bi-droplet-half p-1"></i> 品牌
            </Link>
            <div className="p-1">&gt;</div>
            <Link
              href="/product/list"
              className="p-2"
              style={{ color: '#303132' }}
            >
              <i className="bi bi-droplet p-1"></i>商品種類
            </Link>
          </div>
        </div>

        {/* 輪播 + 商品規格 */}
        <div className="row mt-5 mx-2 my-5">
          <div className="col-sm-7">
            <div className="position-sticky" style={{ top: '2rem' }}>
              <Carousel imgFileNames={product.img.split(',')} id={product.id} category={product.category} />
            </div>
          </div>

          <div className="col-sm-5">
            <h3>{product.name}</h3>
            <Stars />
            <h6>4.0分 | 8則評價</h6>

            <h6 className="note-text">{`NT$${product.discount.toLocaleString()}`}</h6>
            <p className="text-decoration-line-through type-text">{`NT$${product.price.toLocaleString()}`}</p>
            <p dangerouslySetInnerHTML={{ __html: product.info.replace(/\n/g, '<br>') }}></p>

            <hr />

            {/* 顏色 button */}
            <span className="btn-color p-2">顏色</span>
            {product.color.split(',').map((color) => {
              return (
                <button
                  key={color}
                  onClick={() => setSelectColor(color)}
                  className="btn btn-circle"
                  style={
                    selectColor === color
                      ? { backgroundColor: '#265475', color: 'white' }
                      : null
                  }
                >
                  {color}
                </button>
              )
            })}

            <br />

            {/* 尺寸 bottom */}
            <span className="btn-size p-2">尺寸</span>
            {product.size.split(',').map((size) => {
              return (
              <button 
              key={size}
              onClick={()=> setSelectSize(size)}
              className="btn btn-circle"
              style={
                selectSize === size 
                ? { backgroundColor: '#265475', color: 'white' }
                : null
              }
              >
                {size}
              </button>
              )
            })}

            {/* 選擇數量 */}
            <div>
              <button type="button" className="btn btn-circle">
                -
              </button>
              <span className="mx-3">數量</span>
              <button type="button" className="btn btn-circle">
                +
              </button>
            </div>

            {/* 加入購物車 */}
            <button
              className="btn btn-secondary w-100 mb-3 my-3"
              style={{ fontWeight: 'bold', color: 'white' }}
            >
              <i className="bi bi-person-heart"></i> 加入最愛
            </button>
            
            {/* 加入最愛 */}
            <button className="btn btn-outline-primary w-100">
              加入購物車 <i className="bi bi-cart-plus-fill"></i>
            </button>

            {/* 注意事項 */}
            <div className="my-4">
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
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
                      尺寸與版型
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body px-1">
                      <ul>
                        <li>版型較大，建議訂購小半號</li>
                        <li>尺寸：可參考商品細節之尺寸指南</li>
                      </ul>
                    </div>
                  </div>
                </div>

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
                      免運及退貨
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body px-1">
                      <p>訂單金額滿新臺幣 4,500 元即享免費標準運送服務</p>
                      <p>
                        臺北市:標準運送的商品可於 2-5 個工作天內送達
                        快遞運送的商品可於 2-3 個工作天內送達
                      </p>
                      <p>
                        其它縣市: 標準運送的商品可於 3-6 個工作天內送達
                        快遞運送的商品可於 3-5 個工作天內送達
                      </p>
                      <p>訂單皆於星期一至星期五之間處理與寄送 (國定假日除外)</p>
                      <p>會員享免費退貨服務免費退貨。退貨政策例外情況。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        {/* 商品介紹 + 顧客評價 */}

        <Switch />
      </div>

      <style jsx>{`
        .container-1200 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
          margin-top: 70px;
        }
        @media screen and (max-width: 576px) {
          .width-1200 {
            width: 380px;
          }
        }
        .note-text {
          color: var(--red, #dc5151);
          font-size: 14.5px;
        }

        .type-text {
          color: var(--gray, #858585);
          font-weight: normal;
          font-size: 12.5px;
        }

        .btn-md:hover,
        .btn-outline-primary:hover,
        .btn-circle:hover {
          background-color: #265475;
          color: #fff;
          border: none;
        }

        .btn-color {
          margin: 5px 0;
        }
        .btn-size {
          margin: 5px 0;
        }
        .btn-circle {
          margin: 5px 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f5f5f5;
          font-size: 16px;
          background-color: transparent;
        }
        .circle-container {
          display: flex;
          align-items: center;
        }
        .custom-image-container {
          margin: 0 auto;
          width: 600px;
          height: 480px;
        }
        .custom-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .content {
          height: 80px;
        }
        .avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          margin: 15px;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </>
  )
}
