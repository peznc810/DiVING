import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import shuffle from 'lodash/shuffle' // 引入洗牌函式

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'

import { GoHeartFill } from 'react-icons/go'
import { FaCartPlus } from 'react-icons/fa'
import Link from 'next/link'

// import Products from '@/components/home/products'

export default function ProductRecommend() {
  const router = useRouter()
  const { pid } = router.query
  const [product, setProduct] = useState([])

  useEffect(() => {
    if (!pid) return
    fetch(`http://localhost:3000/api/product/`)
      .then((res) => res.json())
      .then((res) => {
        const shuffledProducts = shuffle(res.data)
        const selectedProducts = shuffledProducts.slice(0, 4)
        setProduct(selectedProducts)
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
                <Stack className="discount-tag" direction="horizontal" gap={2}>
                  <Badge bg="danger">DISCOUNT</Badge>
                </Stack>
                <div>
                  <Card.Img
                    variant="top"
                    src={`/images/product/images/${productItem.category}/${productItem.id}/${productItem.img_top}`}
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
                <Card.Body>
                  <div className="text-center">
                    <Link
                      className="h6 my-2"
                      href={`/product/${productItem.id}`}
                    >
                      {productItem.brand}
                    </Link>
                    <br />
                    <Link
                      className="h6 my-2"
                      href={`/product/${productItem.id}`}
                    >
                      {productItem.name}
                    </Link>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    {productItem.discount ? (
                      <div>
                        <span className="note-text">{`NT$${productItem.discount.toLocaleString()}`}</span>
                        <span className="text-decoration-line-through type-text m-2">
                          {`NT$${productItem.price.toLocaleString()}`}
                        </span>
                      </div>
                    ) : (
                      <>
                        <span className="price-text m-1">
                          {`NT$${productItem.price.toLocaleString()}`}
                        </span>
                      </>
                    )}
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
            font-size: 15.5px;
          }
          .type-text {
            color: var(--gray, #858585);
            font-weight: normal;
            font-size: 13.5px;
          }
          .price-text {
            color: var(--gray, #858585);
            font-weight: normal;
            font-size: 15.5px;
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
