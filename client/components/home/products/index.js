import React from 'react'
import ProductCard from './product-card'
import Link from 'next/link'
import styles from './index.module.scss'

export default function Products() {
  return (
    <>
      <main className={`${styles.proMainBlock}`}>
        <div className={`container`}>
          <h3 className="text-light text-center mb-5">熱門商品</h3>
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
