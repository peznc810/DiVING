import React from 'react'
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel'
import styles from './event-carousel.module.scss'

export default function EventCarousel() {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000} className={`${styles.CarouselItem}`}>
          <Image
            src={'/images/event/banner1.jpg'}
            alt="環保"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <Carousel.Caption className={`${styles.info}`}>
            <h3>愛護海洋，由你我開始！</h3>
            <p>
              每一個人都可以成為海洋保護者！加入我們的淨灘活動，為美麗的海洋生態盡一份心力！
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500} className={`${styles.CarouselItem}`}>
          <Image
            src={'/images/event/banner2.jpg'}
            alt="海洋"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <Carousel.Caption>
            {/* <h3></h3>
            <p></p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={`${styles.CarouselItem}`}>
          <Image
            src={'/images/event/banner3.jpg'}
            alt="潛水"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <Carousel.Caption className={`${styles.info}`}>
            <h3>潛水不只是活動，是一種生活方式</h3>
            <p>
              將潛水融入您的生活中！我們的課程和裝備將助您開啟潛水之旅，成為海洋世界的一部分。
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}
