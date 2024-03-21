import React from 'react'
import movies from '@/data/lesson/movie.json'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import StyleSlider from '@/styles/lessonStyle/lessonSlider.module.scss'
// import Style from '@/styles/lessonStyle/slider.module.css'
import settings from './setting'
export default function ImgSlider() {
  return (
    <>
      <div className={StyleSlider['Slider']}>
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
