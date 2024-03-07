import movies from '@/data/lesson/movie.json'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Image from 'react-bootstrap/Image'
import React from 'react'

import settings from './setting'
export default function ImgSlider() {
  return (
    <>
      <div className="Slider">
        <Slider {...settings}>
          {movies.map((movie, i) => (
            <div key={i} className="warp">
              <img src={movie.url} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
