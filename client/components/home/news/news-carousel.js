import React from 'react'
import NewsItem from './news-item'

export default function NewsCarousel() {
  return (
    <>
      <div
        id="newsCarousel"
        classNameName={`carousel slide`}
        data-bs-ride="carousel"
      >
        <div classNameName={`carousel-inner`}>
          <NewsItem />
        </div>
        <div className="carousel-indicators">
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
