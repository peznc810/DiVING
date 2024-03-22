import React from 'react'
import ProductCard from './product-card'
import Link from 'next/link'
import styles from './index.module.scss'
import { motion } from 'framer-motion'

export default function Products() {
  return (
    <>
      <main className={`${styles.proMainBlock}`}>
        <div className={`container`}>
          <div className={`d-inline-block ${styles.title}`}>
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
              className="text-light text-center m-0 px-3"
            >
              HOT PRODUCTS
            </motion.h3>
          </div>

          <div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: 'tween',
              delay: 0.5,
              duration: 1,
              ease: 'easeIn',
            }}
            viewport={{ once: true }}
            className={`d-flex flex-wrap justify-content-center`}
          >
            <ProductCard />
          </div>
          <div className={`text-center my-5`}>
            <Link
              href={'./product'}
              className={`d-inline-block ${styles.more}`}
            >
              查看更多
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
