import React from 'react'
import NewsItem from './news-item'
import styles from './news-carousel.module.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

export default function NewsCarousel() {
  return (
    <>
      <div
        id="newsCarousel"
        className={`carousel slide position-relation`}
        data-bs-ride="carousel"
      >
        <div
          className={`carousel-inner d-flex align-items-center pt-3 ps-4 ${styles.carouselInner}`}
        >
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
        </div>
        <div className={`${styles.arrowBtn} me-5 position-absolute`}>
          <button type="button" className={`me-3`}>
            <IoIosArrowBack />
          </button>
          <button type="button">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </>
  )
}
