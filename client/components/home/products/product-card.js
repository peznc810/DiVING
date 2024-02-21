import React from 'react'
import Image from 'next/image'
import styles from './product-card.module.scss'

export default function ProductCard() {
  return (
    <>
      <div className={`${styles.cardItem} m-3`}>
        <span className={`${styles.tag}`}>HOT</span>
        <div className={`${styles.imgDiv}`}>
          <Image
            src={'/images/home/test/pro1.png'}
            alt=""
            fill
            object-fit="cover"
          />
        </div>

        <div className={`card-body mt-3 px-1 ${styles.cardBody}`}>
          <h5 className="card-title text-light">高彈性防寒衣 (連身式)-女</h5>
          <p className="card-text mt-3">NT$300</p>
        </div>
      </div>
    </>
  )
}
