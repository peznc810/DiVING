import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Star from '@/components/product/star/star'
import Carousel from '@/components/product/carousel'
import Switch from '@/components/product/detail/switch'
import ProductRecommend from '@/components/product/detail/product-recommond'

import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { FaHome } from 'react-icons/fa'
import { GoHeartFill } from 'react-icons/go'
import { FaCartPlus } from 'react-icons/fa'
import { GiClothes } from 'react-icons/gi'
import { FaShuttleVan } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'

export default function Detail() {
  const router = useRouter()
  const { pid } = router.query
  const [product, setProduct] = useState(null)

  const [productCount, setProductCount] = useState(1) //增加、減少數量

  const [selectColor, setSelectColor] = useState(null)
  const [selectSize, setSelectSize] = useState(null)

  const [rating, setRating] = useState(0) //評分

  const [favorites, setFavorites] = useState([]) //加入收藏

  //css樣式
  const [accordionStyle, setAccordionStyle] = useState({
    size: '',
    freight: '',
  })
  const handleButtonClick = (buttonName) => {
    setAccordionStyle({
      ...accordionStyle,
      [buttonName]: accordionStyle[buttonName] ? '' : 'active',
    })
  }

  // 得到我的最愛
  const handleAddToFavorites = async () => {
    try {
      const userId = '用户ID' // 替换为实际的用户ID
      const productId = product.id // 使用产品ID作为收藏的对象

      const response = await fetch('http://localhost:3005/api/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, product_id: productId }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      // 弹出通知，表示成功加入收藏
      notify()
    } catch (error) {
      console.error('加入收藏失败:', error)
    }
  }

  const notify = () =>
    toast('商品已加入收藏！', {
      icon: '✅',
    })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await fetch(`http://localhost:3005/api/product/id?pid=${pid}`, {
          method: 'GET',
        })
          .then((res) => {
            return res.json()
          })
          .then(([data]) => {
            setProduct(data ? data : [])
          })
      } catch {
        ;(err) => {
          console.error('Error fetching data:', err)
        }
      }
    }
    if (pid) fetchProduct()
  }, [pid])

  // if (product) {
  //   const [newproduct] = product.filter((o) => {
  //     return o.id == pid
  //   })
  //   setProduct(newproduct)
  // }

  // useEffect(() => {
  //   if (!pid) return
  //   fetch(`http://localhost:3000/api/product/${pid}`)
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((res) => {
  //       setProduct(res.data)
  //     })
  // }, [pid])

  const increment = () => {
    setProductCount((prevCount) => {
      return prevCount + 1
    })
  }

  const decrement = () => {
    setProductCount((prevCount) => {
      if (prevCount === 1) {
        return prevCount
      } else {
        return prevCount - 1
      }
    })
  }

  if (!product) return null
  // if(!product){
  //   return null
  // }
  return (
    <>
      <div className="container-1200">
        {/* 麵包屑 */}
        <Breadcrumb>
          <Breadcrumb.Item href="http://localhost:3000">
            <FaHome />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="http://localhost:3000/product">
            商品列表
          </Breadcrumb.Item>
          <Breadcrumb.Item href={`http://localhost:3000/product/${pid}`}>
            商品細節
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* 輪播 + 商品規格 */}
        <div className="row mt-5 mx-2 my-5">
          <div className="col-sm-7">
            <div className="position-sticky" style={{ top: '2rem' }}>
              <Carousel
                imgFileNames={product.img.split(',')}
                id={product.id}
                category={product.category}
              />
            </div>
          </div>

          <div className="col-sm-5">
            <h3>{product.name}</h3>
            <Star rating={rating} setRating={setRating} />
            <h6 className="my-1">4.0分 | 8則評價</h6>
            {product.discount ? (
              <>
                <span className="note-text">{`NT$${product.discount.toLocaleString()}`}</span>
                <span className="text-decoration-line-through type-text m-3 my-2">
                  {`NT$${product.price.toLocaleString()}`}
                </span>
              </>
            ) : (
              <>
                <p className="my-2 price-text">
                  {`NT$${product.price.toLocaleString()}`}
                </p>
              </>
            )}
            <p
              className="my-1"
              dangerouslySetInnerHTML={{
                __html: product.info.replace(/\n/g, '<br>'),
              }}
            ></p>
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
                  onClick={() => setSelectSize(size)}
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
              <button
                className="btn btn-circle"
                onClick={() => {
                  decrement()
                }}
              >
                -
              </button>
              <span className="mx-3"> {productCount} </span>
              <button
                className="btn btn-circle"
                onClick={() => {
                  increment()
                }}
              >
                +
              </button>
            </div>

            {/* 加入最愛 */}
            <button
              className="btn btn-secondary w-100 mb-3 my-3"
              style={{ fontWeight: 'bold', color: 'white' }}
              onClick={notify}
            >
              <GoHeartFill /> 加入收藏
              <Toaster />
            </button>

            {/* 加入購物車 */}
            <button className="btn btn-outline-primary w-100">
              加入購物車 <FaCartPlus />
              {/* <Toaster position="top-center" reverseOrder={false} /> */}
            </button>

            {/* 注意事項 */}
            <div className="my-5">
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                <div className="accordion-item">
                  <h4 className="accordion-header">
                    <button
                      className={`accordion-button collapsed ${accordionStyle.size}`}
                      type="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-controls="panelsStayOpen-collapseOne"
                      onClick={() => handleButtonClick('size')}
                    >
                      <GiClothes className="GiClothes m-1" />
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
                      className={`accordion-button collapsed ${accordionStyle.freight}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                      onClick={() => handleButtonClick('freight')}
                    >
                      <FaShuttleVan className="FaShuttleVan m-1" />
                      免運及退貨
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body px-1">
                      <ol>
                        <li>訂單金額滿新臺幣 2,000 元，即享免運服務</li>
                        <li>
                          臺北市：標準運送的商品可於 2-5 個工作天內送達
                          <br />
                          快遞運送的商品可於 2-3 個工作天內送達
                        </li>
                        <li>
                          其它縣市：標準運送的商品可於 3-6 個工作天內送達
                          <br />
                          快遞運送的商品可於 3-5 個工作天內送達
                        </li>
                        <li>訂單皆於平日上班時間(09:00-18:00)處理與寄送</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        {/* 商品介紹 + 顧客評價 */}
        <Switch
          name={product.name}
          imgDetails={product.img_detail.split(',')}
          id={product.id}
          category={product.category}
          detail={product.detail}
          rating={rating}
          setRating={setRating}
        />
      </div>
      <br />
      <br />
      <br />

      <div>
        <h3 className="text-center my-5">你可能會喜歡的商品⋯</h3>
        <ProductRecommend />
      </div>

      <style jsx>{`
        .container-1200 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
          margin-top: 10px;
        }
        @media screen and (max-width: 576px) {
          .width-1200 {
            width: 380px;
          }
        }
        .my-1 {
          font-family: Arial, sans-serif;
        }
        .note-text {
          color: var(--red, #dc5151);
          font-size: 16.5px;
        }
        .type-text {
          color: var(--gray, #858585);
          font-weight: normal;
          font-size: 14px;
        }
        .price-text {
          color: var(--gray, #858585);
          font-weight: normal;
          font-size: 16.5px;
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
          font-size: 15.5px;
          background-color: transparent;
        }
      `}</style>
    </>
  )
}
