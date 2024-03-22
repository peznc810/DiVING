import Link from 'next/link'
import React from 'react'
import styles from './index.module.scss'
import NewsCarousel from './news-carousel'
import { motion } from 'framer-motion'

export default function News() {
  return (
    <>
      <section className={`${styles.news}`}>
        <div className={`container-fluid p-0 ${styles.content}`}>
          {/* 標題 */}
          <div className={`ps-3 ${styles.title} d-flex align-items-end`}>
            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: 'tween',
                delay: 0.5,
                duration: 1,
                ease: 'easeIn',
              }}
              viewport={{ once: true }}
              className="me-3 mb-0"
            >
              NEWS
            </motion.h3>
            <Link
              href={'/event'}
              className={`${styles.moreBtn} me-5 text-center`}
            >
              more
              <i className="bi bi-caret-right-fill ms-1"></i>
            </Link>
          </div>

          {/* news輪播 */}
          <NewsCarousel />
        </div>
      </section>
    </>
  )
}
