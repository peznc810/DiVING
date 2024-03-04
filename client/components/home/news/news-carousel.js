import { useState, useRef, useEffect } from 'react'
import { useEvent } from '@/hooks/use-eventData'
import NewsItem from './news-item'
import styles from './news-carousel.module.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

export default function NewsCarousel() {
  const eventList = useEvent()
  const [index, setIndex] = useState(0)
  const [focusIndex, setFocusIndex] = useState(0)
  const carouselRef = useRef(null) //輪播每次移動105px

  //  點擊按鈕輪播區塊會移動105px，並且focus會換到下一個
  //  如果index=0按往前會沒作用，index=5往後沒作用，但是focus可以一直往後到最後一個index
  const preBtn = () => {
    if (index > 0) {
      return setIndex((preIndex) => preIndex - 1)
    }
  }

  const nextBtn = () => {
    const maxIndex = eventList.length - 1
    if (index < maxIndex) {
      return setIndex((preIndex) => preIndex + 1)
    }
  }

  useEffect(() => {
    setFocusIndex(index)
    setIndex(index)
  }, [index])

  const handleItemFocus = (index) => {
    setFocusIndex(index)
    // console.log(index)
  }

  const position = -170 * index
  // console.log(position)
  // console.log(eventList)
  return (
    <>
      <div className={`position-relation ${styles.carouselInner}`}>
        <div
          className={`d-flex align-items-center pt-3  `}
          ref={carouselRef}
          style={{
            transition: 'transform 0.3s ease',
            transform: `translateX(${position}px)`,
          }}
        >
          {eventList.slice(0, 6).map((v, i) => {
            return (
              <NewsItem
                key={v.id}
                content={v}
                isFocused={i === focusIndex}
                onFocus={() => {
                  handleItemFocus(i)
                }}
              />
            )
          })}
        </div>
      </div>
      {/* 按鈕 */}
      <div className={`${styles.arrowBtn} d-flex justify-content-end `}>
        <button
          type="button"
          className={`me-3`}
          onClick={() => {
            preBtn()
          }}
          disabled={index === 0}
        >
          <IoIosArrowBack />
        </button>
        <button
          type="button"
          onClick={() => {
            nextBtn()
          }}
          disabled={position === -850}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </>
  )
}
