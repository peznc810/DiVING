import React from 'react'
import styles from './news-item.module.scss'

export default function NewsItem() {
  return (
    <>
      <div className={` ${styles.newsItem}`}>
        <span className={`${styles.date}`}>December 23.2023</span>
        <div className={`mt-2 ${styles.newsImg}`}>
          <img src="" alt="" />
        </div>
        <div className={` mt-3 ${styles.newsContent}`}>
          <div className={`mb-3 ${styles.tag}`}>活動優惠</div>
          <h6 className={`mb-0 ${styles.title}`}>
            冬季潛水優惠！現省1000元冬季潛水優惠！
          </h6>
          <p className={`mb-3 mt-2 ${styles.info}`}>
            在冬季，水庫和湖泊的水域清澈見底，給您提供絕佳的能見度，讓您盡情欣賞水中生態的美妙。我們的凍齡潛水體驗讓您彷彿穿越到水底仙境，感受那片寧靜和神秘。
            冬季潛水需要更專業的裝備，我們為您提供最先進的保暖裝備，讓您在水中感到溫暖舒適。我們的專業潛水教練將為您提供詳細的裝備指導，確保您在水下保持溫暖。
            為了感謝您的支持，我們推出了限時冬季潛水優惠套餐！現在報名即可享受折扣優惠和免費專業潛水照片服務。讓您的冬季潛水之旅成為難忘的回憶。ｚ
          </p>
        </div>
      </div>
    </>
  )
}
