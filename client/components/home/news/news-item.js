import React from 'react'
import styles from './news-item.module.scss'

export default function NewsItem() {
  return (
    <>
      <div
        className={` ${styles.newsItem} d-flex align-items-center  flex-shrink-0`}
      >
        <div className={`${styles.day} text-center text-light`}>
          <p className={`${styles.date} fw-bold `}>09</p>
          <p className={`${styles.monte} m-0`}>Mar</p>
        </div>
        <div className={` ${styles.newsContent}`}>
          <div className={`mb-2 ${styles.tag}`}>活動優惠</div>
          <h6 className={`mb-0 ${styles.title}`}>
            冬季潛水優惠！現省1000元冬季潛水優惠！
          </h6>
        </div>
      </div>
    </>
  )
}
