import Link from 'next/link'
import React from 'react'
import styles from './index.module.scss'
import NewsCarousel from './news-carousel'

export default function News() {
  return (
    <>
      <section className={`${styles.news} my-5`}>
        <div className={`container-fluid ${styles.content}`}>
          {/* 標題 */}
          <div
            className={`d-flex justify-content-between align-items-center px-3 pb-2 ${styles.title}`}
          >
            <h3>NEWS</h3>
            <Link href={'./news'} className={`${styles.moreBtn}`}>
              more<i class="bi bi-caret-right-fill"></i>
            </Link>
          </div>

          {/* news輪播 */}
          <div className={`${styles.newsCarousel} mt-5 px-4 d-flex`}>
            <NewsCarousel />
          </div>
        </div>
      </section>
    </>
  )
}
