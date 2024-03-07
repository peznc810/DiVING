import React from 'react'
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
