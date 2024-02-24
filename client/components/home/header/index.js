import React from 'react'
import styles from './index.module.scss'
// import Navbar2 from '@/components/layout/default-layout/navbar/index-home'
import Navbar from '@/components/layout/default-layout/navbar'

export default function HomeHeader() {
  return (
    <>
      <header className={` ${styles.homeHeader}`}>
        <div className={`${styles.homeContainer}`}>
          <h2>
            Go
            <br />
            DiVING
          </h2>
          <h4 className="pe-5">精選品牌｜專業教練｜探索海洋世界</h4>
        </div>
      </header>
    </>
  )
}
