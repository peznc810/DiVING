import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import shuffle from 'lodash/shuffle'; // 引入洗牌函式

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { GoHeartFill } from "react-icons/go";
import { FaCartPlus } from "react-icons/fa";
import Products from '@/components/home/products';

export default function ProductRecommend() {
  const router = useRouter()
  const { pid } = router.query
  const [product, setProduct] = useState([])

  useEffect(() => {
    if (!pid) return
    fetch(`http://localhost:3000/api/product/${pid}`)
      .then((res) => res.json())
      .then((res) => {
        // 洗牌並選擇前四個產品
        const shuffledProducts = shuffle(res.data);
        const selectedProducts = shuffledProducts.slice(0, 4);
        setProduct(selectedProducts);
      })
  }, [pid])

  if (!product || !Array.isArray(product)) return null  

  return (
    <>
      <div className="container width-1200">
        <div className="row justify-content-center my-5">
          {product.map((productItem) => (
           <div key={productItem} className="col-sm-3 col-12 my-3">
              <Card className="custom-card bg-bg-gray">
                <Card.Img
                  variant="top"
                  src={`/images/product/images/${productItem.category}/${productItem.id}/${productItem.img_top}`}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
                <Card.Body>
                  <Card.Title className="h6">{productItem.productItem}</Card.Title>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    {productItem.discount ?
                      <>
                        <span className="note-text">{`NT$${productItem.discount}`}</span>
                        <span className="text-decoration-line-through type-text">
                          {`NT$${productItem.price.toString()}`}
                        </span>
                      </>
                      : 
                      <>
                      <span>
                        {/* {`NT$${productItem.price.toString()}`} */}
                        <span className="note-text">Price not available</span>
                      </span>
                      </>
                    }
                    <div>
                      <Button className="color-btn" variant="light">
                        <GoHeartFill />
                      </Button>
                      <Button className="color-btn" variant="light">
                        <FaCartPlus />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>
        {`
          .width-1200 {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0;
          }
          @media screen and (max-width: 576px) {
            .width-1200 {
              width: 380px;
            }
          }
          .note-text {
            color: var(--red, #dc5151);
          }

          .type-text {
            color: var(--gray, #858585);
            font-weight: normal;
            font-size: 14px;
          }
          .color-btn {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: none;
            font-size: 18px;
            background-color: transparent;
          }
          .color-btn:hover {
            background-color: #265475;
            color: #fff;
            border: none;
          }
        `}
      </style>
    </>
  )
}
