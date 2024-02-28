import React from 'react'
import Image from 'next/image'
import styles from './event-carousel.module.scss'

export default function EventCarousel() {
  return (
    <>
      <header className={`${styles.eventCarousel}`}>
        <div className={` ${styles.carouselDiv} `}></div>
      </header>
    </>
  )
}
