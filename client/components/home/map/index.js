import React from 'react'
import MapCard from './mapCard'
import Link from 'next/link'
import styles from './index.module.scss'

export default function MapSection() {
  return (
    <>
      <section className={`${styles.mapSection} `}>
        <div className={`container `}>
          <div className={`${styles.title} mb-5 d-flex align-items-end`}>
            <h3 className={`ps-3 m-0 me-3`}>MAP</h3>
            <Link
              href={'/event'}
              className={`${styles.moreBtn} me-5 text-center`}
            >
              more
              <i className="bi bi-caret-right-fill ms-1"></i>
            </Link>
          </div>
          <div className={`py-5`}>
            <MapCard />
          </div>
        </div>
      </section>
    </>
  )
}
