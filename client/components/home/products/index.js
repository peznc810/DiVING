import React from 'react'
import ProductCard from './product-card'
import Link from 'next/link'
import styles from './index.module.scss'

export default function Products() {
  return (
    <>
      <main className={`${styles.proMainBlock}`}>
        <div className={`container`}>
          <div className={`d-inline-block ${styles.title}`}>
            <h3 className="text-light text-center m-0 px-3">HOT PRODUCTS</h3>
          </div>

          <div className={`d-flex flex-wrap justify-content-center`}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className={`text-center my-5`}>
            <Link href={'./product'} className={`d-inline-block `}>
              查看更多
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
