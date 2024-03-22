import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './product-card.module.scss'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ProductCard() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const url = 'http://localhost:3005/api/product'
    fetch(url, {
      method: 'get',
    })
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        console.log(result)
        setProducts(result)
      })
      .catch((error) => {
        console.log('連線錯誤')
      })
  }, [])

  return (
    <>
      {products.slice(0, 8).map((v, i) => {
        return (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: 'spring',
              delay: i * 0.3,
            }}
            viewport={{ once: true }}
            className={`${styles.cardItem} `}
          >
            <Link href={`/product/${v.id}`}>
              <span className={`${styles.tag}`}>HOT</span>
              <div className={`${styles.imgDiv}`}>
                <Image
                  src={`/images/product/images/${v.category}/${v.id}/${v.img_top}`}
                  alt={v.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>

              <div className={`card-body mt-3 px-1 ${styles.cardBody}`}>
                <h5 className="card-title text-light">{v.name}</h5>
                <p className="card-text mt-2">NT$ {v.price}</p>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </>
  )
}
