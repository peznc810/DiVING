import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.scss'

const newsContent = [
  {
    id: '1',
    img: '/images/home/about-environmental.jpg',
    title: '海洋環保',
    info: '以「保護海洋、潛水探險、淨灘行動」的理念，結合潛水探險和淨灘的獨特體驗，喚起大眾對海洋生態的關注並激發對海洋保育的熱情。讓您親自參與清理海灘上的垃圾，透過實際行動，感受到個人努力對環境的正面影響。這不僅是一場冒險，更是對海洋愛護的實際參與。讓我們攜手保護海洋，成就一場深刻而有意義的海洋環保之旅！',
  },
  {
    id: '2',
    img: '/images/home/about-lesson.jpg',
    title: '專業課程',
    info: '探索無盡的海底奇蹟，由淺入深，我們潛水網站為您呈現多層次的潛水課程！無論您是初學者還是資深潛水員，我們都有量身打造的課程，讓您在每次潛水中都能獲得更深層次的體驗。從水肺初體驗到專業技術潛水，讓我們一同啟航，探索海底的神秘世界。立即加入，開啟您潛水旅程的新章節！',
  },
  {
    id: '3',
    img: '/images/home/about-equipment.jpg',
    title: '嚴選潛水設備',
    info: '我們嚴選專業的潛水設備以確保潛水安全和舒適體驗為關鍵。在挑選潛水裝備時，著重於品質、耐用性和功能性是至關重要的。在選擇潛水裝備時，確保所選擇的設備符合潛水活動的需求並符合安全標準。專業潛水設備的嚴選是確保潛水者在水下獲得安全、順暢和令人難忘的潛水體驗的關鍵。',
  },
]

export default function About() {
  return (
    <>
      <article className={`${styles.about}`}>
        <div className="container d-flex justify-content-center">
          {newsContent.map((v) => {
            return (
              <>
                <div key={v.id} className={`d-flex ${styles.aboutItem}`}>
                  <div className={`${styles.img}`}>
                    <div className={`${styles.imgBtn}`}>{v.title}</div>
                    <div className={`${styles.imgWrapper}`}>
                      <Image
                        src={v.img}
                        alt={v.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                  <div className={`${styles.content}`}>
                    <h4>{v.title}</h4>
                    <p>{v.info}</p>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </article>
    </>
  )
}

function AboutItemHover() {
  return (
    <>
      <div className={`${styles.content}`}>
        <h4>海洋環保</h4>
        <p></p>
      </div>
    </>
  )
}
