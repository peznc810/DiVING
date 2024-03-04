import Link from 'next/link'
import React from 'react'
import styles from './index.module.scss'
import NewsCarousel from './news-carousel'

export default function News() {
  return (
    <>
      <section className={`${styles.news}`}>
        <div className={`container-fluid p-0 ${styles.content}`}>
          {/* 標題 */}
          <div className={``}>
            <div className={`ps-3 ${styles.title} d-flex align-items-end`}>
              <h3 className="me-3 mb-0">NEWS</h3>
              <Link
                href={'/event'}
                className={`${styles.moreBtn} me-5 text-center`}
              >
                more
                <i className="bi bi-caret-right-fill ms-1"></i>
              </Link>
            </div>
          </div>
          {/* news輪播 */}
          <NewsCarousel />
        </div>
      </section>
    </>
  )
}
