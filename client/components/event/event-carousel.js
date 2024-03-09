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
            alt="banner1"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>as</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500} className={`${styles.CarouselItem}`}>
          <Image
            src={'/images/event/banner2.jpg'}
            alt="banner1"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>as</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={`${styles.CarouselItem}`}>
          <Image
            src={'/images/event/banner3.jpg'}
            alt="banner1"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>第一張</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}
