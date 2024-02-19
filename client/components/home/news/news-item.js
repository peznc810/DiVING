import React from 'react'
import styles from './news-item.module.scss'

export default function NewsItem() {
  return (
    <>
      <div className={`${styles.newsItem}`}>
        <div className={`${styles.newsImg}`}>
          <img src="" alt="" />
        </div>
        <div className={`${styles.newsContent}`}>
          <div className={`${styles.tag}`}>活動優惠</div>
          <p className={`fw-bold mt-3 mb-0 ${styles.title}`}>
            冬季潛水優惠！現省1000元
          </p>
          <span className={`${styles.date}`}>2023.12.23</span>
        </div>
      </div>
    </>
  )
}
