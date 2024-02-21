import React from 'react'
import NewsItem from './news-item'
import styles from './news-carousel.module.scss'

export default function NewsCarousel() {
  return (
    <>
      <div
        id="newsCarousel"
        className={`carousel slide `}
        data-bs-ride="carousel"
      >
        <div className={`carousel-inner d-flex overflow-hidden`}>
          <NewsItem />
          <NewsItem />
          <NewsItem />
        </div>
        {/* 輪播點 */}
        <div className={`${styles.carouselDot} d-flex justify-content-center`}>
          <button
            type="button"
            data-bs-target="#newsCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#newsCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#newsCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
      </div>
    </>
  )
}
