import React from 'react'
import styles from './index.module.scss'

export default function HomeHeader() {
  return (
    <>
      <>
        <header className={`${styles.homeHeader}`}>
          <div className={`container ${styles.homeContainer}`}>
            <h2>
              Go <br />
              DiVING
            </h2>
            <h4>精選品牌｜專業教練｜探索海洋世界</h4>
          </div>
        </header>
      </>
    </>
  )
}
