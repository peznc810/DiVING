import { useMemo, useEffect, useState } from 'react'
import Star from '@/components/product/star/star'
import Link from 'next/link'

import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
import { GoHeartFill } from 'react-icons/go'
import { TbHeartX } from 'react-icons/tb'
import { FaCartPlus } from 'react-icons/fa'

import { Toaster } from 'react-hot-toast'
import useCollect from '@/hooks/use-collect'

export default function Card({ value, rating, setRating }) {
  const [isHovered, setIsHovered] = useState(false)

  const { handleAddToFavorites, handleRemoveFavorites, favorites } = useCollect(
    value.id
  )

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <>
      <div className="col">
        <div
          className="card w-350 border-radius"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card-body no-space-x">
            {value.discount ? (
              <>
                <div>
                  <Stack
                    className="discount-tag"
                    direction="horizontal"
                    gap={2}
                  >
                    <Badge bg="danger">DISCOUNT</Badge>
                  </Stack>
                  <img
                    src={`/images/product/images/${value.category}/${value.id}/${value.img_top}`}
                    alt={`${value.id}`}
                    style={{
                      marginTop: isHovered ? '0' : '-15px',
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <img
                    src={`/images/product/images/${value.category}/${value.id}/${value.img_top}`}
                    alt={`${value.id}`}
                    style={{
                      marginTop: isHovered ? '0' : '-15px',
                    }}
                  />
                </div>
              </>
            )}

            {isHovered ? (
              <div>
                <div className="bi-icon">
                  <button
                    className="btn mouse-add p-2"
                    onClick={
                      favorites ? handleRemoveFavorites : handleAddToFavorites
                    }
                  >
                    {favorites ? <TbHeartX /> : <GoHeartFill />}
                    <Toaster />
                  </button>
                  <button className="btn mouse-add p-2">
                    <FaCartPlus />
                  </button>
                </div>
                <Link href={`/product/${value.id}`} className="viewmore-css">
                  View more &gt;&gt;
                </Link>
              </div>
            ) : (
              <div className="p-2 ">
                {/* <Star rating={rating} setRating={() => {}} /> */}
                <p className="card-text h-now mt-2">{value.brand}</p>
                <p className="card-text type-text h-now">{value.name}</p>
                {value.discount ? (
                  <>
                    <span className="note-text">{`NT$${value.discount.toLocaleString()}`}</span>
                    <span className="text-decoration-line-through type-text card-text m-2">
                      {`NT$${value.price.toLocaleString()}`}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="my-2 price-text card-text">
                      {`NT$${value.price.toLocaleString()}`}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .col {
          max-width: 1200px;
        }
        @media screen and (max-width: 576px) {
          .col {
            margin: 15px auto;
            width: 390px;
          }
        }
        .mouse-add {
          margin: 10px 5px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #f5f5f57f;
          font-size: 20px;
          background-color: transparent;
          &.mouse-add:hover {
            background-color: #265475;
            color: #fff;
            border: none;
          }
        }
        .bi-icon {
          margin-top: 0px;
        }
        .card-text {
          font-weight: 500;
          margin-bottom: 0.5px;
        }
        .note-text {
          color: var(--red, #dc5151);
          font-size: 16.5px;
          font-family: Arial, sans-serif;
        }
        .type-text {
          color: var(--gray, #858585);
          font-weight: normal;
          font-size: 14px;
          font-family: Arial, sans-serif;
        }
        .price-text {
          color: var(--gray, #858585);
          font-weight: normal;
          font-size: 16.5px;
          font-family: Arial, sans-serif;
        }
        .h-now {
          font-size: 15.5px;
          color: #303132;
          font-weight: 400;
        }
      `}</style>
    </>
  )
}
