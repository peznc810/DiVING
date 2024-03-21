import { useMemo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Star from '@/components/product/star/star'
import Carousel from '@/components/product/carousel'
import Switch from '@/components/product/detail/switch'
import ProductRecommend from '@/components/product/detail/product-recommond'

import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { FaHome } from 'react-icons/fa'
import { GoHeartFill } from 'react-icons/go'
import { TbHeartX } from 'react-icons/tb'
import { FaCartPlus } from 'react-icons/fa'
import { GiClothes } from 'react-icons/gi'
import { FaShuttleVan } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import useCollect from '@/hooks/use-collect'
import { useCart } from '@/hooks/cart'

export default function Detail() {
  const router = useRouter()
  const { pid } = router.query
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const { handleAddToFavorites, handleRemoveFavorites, favorites } =
    useCollect(pid)

  const [productCount, setProductCount] = useState(1) //增加、減少數量

  const [selectColor, setSelectColor] = useState(null)
  const [selectSize, setSelectSize] = useState(null)

  const [rating, setRating] = useState(0) //評分
  const [allComments, setAllComments] = useState([]) //評論

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

  //評論
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/product/comment?pid=${pid}`,
          {
            method: 'GET',
          }
        )
        // console.log('response', response)
        if (response.ok) {
          const data = await response.json()
          setAllComments(data)
          // console.log(data)
        }
      } catch (err) {
        // console.error('送出評價失敗：', err)
      }
    }
    fetchComment()
  }, [pid])

  const averageScore = useMemo(() => {
    let totalScore = 0
    allComments.forEach((comment) => {
      totalScore = totalScore + comment.score
    })
    const average = totalScore / allComments.length
    const formattedScore = average.toFixed(1)
    return formattedScore
  }, [allComments])

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
          // console.error('Error fetching data:', err)
        }
      }
    }
    if (pid) {
      fetchProduct()
    }
  }, [pid])

  useEffect(() => {
    if (product) {
      setSelectColor(product.color.split(',')[0])
      setSelectSize(product.size.split(',')[0])
    }
  }, [product])

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

  const addProduct = (
    product_id,
    product_detail,
    name,
    price,
    discount_price,
    num,
    category,
    pimg
  ) => {
    const item = {
      product_id,
      product_detail,
      name,
      price,
      discount_price,
      num,
      category,
      pimg,
    }
    addItem(item)
    toast.success('已加入購物車')
  }

  if (!product) return null
  return (
    <>
      <div className="container-1200">
        {/* 麵包屑 */}
        <Breadcrumb className="product-Breadcrumb">
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
              {console.log(product)}
              <Carousel
                imgFileNames={product.img.split(',')}
                id={product.id}
                category={product.category}
              />
            </div>
          </div>

          <div className="col-sm-5">
            <h4>{product.name}</h4>
            <Star rating={averageScore} setRating={setRating} />
            <h6 className="my-2">{`${averageScore}分 | ${allComments.length}則評價`}</h6>
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
              className="my-1 product-info"
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
              <span className="mx-3 productCount"> {productCount} </span>
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
              onClick={favorites ? handleRemoveFavorites : handleAddToFavorites}
            >
              {favorites ? (
                <>
                  <TbHeartX className="detail-TbHeartX" /> 移除收藏
                </>
              ) : (
                <>
                  <GoHeartFill className="detail-GoHeartFill" /> 收藏
                </>
              )}
              <Toaster />
            </button>

            {/* 加入購物車 */}
            <button
              className="btn btn-outline-primary w-100"
              onClick={() => {
                addProduct(
                  product.id,
                  `${selectColor}/${selectSize}`,
                  product.name,
                  product.price,
                  product.discount,
                  productCount,
                  product.category,
                  product.img_top
                )
              }}
            >
              加入購物車 <FaCartPlus className="detail-FaCartPlus" />
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
        .productCount,
        .product-info {
          font-size: 15px;
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
