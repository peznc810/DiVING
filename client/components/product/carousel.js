import { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'


export default function Carousel({imgFileNames, id, category}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  // console.log('category', category)

  return (
    <>
    <Swiper
        style={{
          '--swiper-navigation-color': '#265475',
          '--swiper-pagination-color': '#265475',
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
      {imgFileNames.map((imgFileName) => {
        return <SwiperSlide key={imgFileName}>
        <div className="img-container">
          <img src={`/images/product/images/${category}/${id}/${imgFileName}`} />
        </div>
        </SwiperSlide>
      })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={1}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
      {imgFileNames.map((imgFileName) => {
       return <SwiperSlide key={imgFileName}>
          <div className="img-bottom">
            <img src={`/images/product/images/${category}/${id}/${imgFileName}`} />
          </div>
        </SwiperSlide>
      })}
      </Swiper>
      
      <style jsx>{`
      .img-container {
          display: flex; 
          justify-content: center;
          align-items: center; 
          width: 660px;
          height: 480px;
          overflow: hidden;
      }

      .img-container img {
          width: 100%;
          height: 100%;
          object-fit: contain;
      }
      
      .img-bottom {
          width: 100px; 
          height: 100px; 
          margin: 15px auto;
      }

      .img-bottom img {
          max-width: 100%;
          max-height: 100%; 
          display: block; 
          margin: auto; 
      }
      @media max-width: 390px {
      .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%; 
        height: auto; 
      }

      .img-container img {
        margin: auto;
        max-width: 100%; 
        max-height: 100%; 
        object-fit: contain; 
      }
    }
      `} 
      </style>
    </>
  )
}
