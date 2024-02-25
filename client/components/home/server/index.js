import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.scss'

export default function Server() {
  return (
    <>
      <article className={`${styles.server}`}>
        <div className={`d-inline-block px-4 ${styles.title}`}>
          <h3 className={`m-0`}>OUR SERVER</h3>
        </div>

        <div className={`${styles.severContent}`}>
          {/* Lesson */}
          <div className={`d-flex ${styles.sevLesson}`}>
            <div className={` ${styles.imgDiv}`}>
              <Image
                src={'/images/home/server-lesson.jpg'}
                alt=""
                width={400}
                height={520}
                priority
              />
            </div>
            <div className={` ${styles.content}`}>
              <h4>
                專業課程 & <br /> 嚴選潛水設備
              </h4>
              <p>
                探索無盡的海底奇蹟，由淺入深，我們潛水網站為您呈現多層次的潛水課程！無論您是初學者還是資深潛水員，我們都有量身打造的課程，讓您在每次潛水中都能獲得更深層次的體驗。從水肺初體驗到專業技術潛水，讓我們一同啟航，探索海底的神秘世界。立即加入，開啟您潛水旅程的新章節！
              </p>
            </div>
          </div>

          {/* product */}
          <div className={`d-flex ${styles.sevProduct}`}>
            <div className={` ${styles.content}`}>
              <h4>海洋環保</h4>
              <p>
                以「保護海洋、潛水探險、淨灘行動」的理念，結合潛水探險和淨灘的獨特體驗，喚起大眾對海洋生態的關注並激發對海洋保育的熱情。
                <br />
                讓您親自參與清理海灘上的垃圾，透過實際行動，感受到個人努力對環境的正面影響。這不僅是一場冒險，更是對海洋愛護的實際參與。讓我們攜手保護海洋，成就一場深刻而有意義的海洋環保之旅！
              </p>
            </div>
            <div className={` ${styles.imgDiv}`}>
              <Image
                src={'/images/home/server-3.jpg'}
                alt=""
                width={720}
                height={420}
                priority
              />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
