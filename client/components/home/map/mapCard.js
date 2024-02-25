import React from 'react'
import Image from 'next/image'
import styles from './mapCard.module.scss'

export default function MapCard() {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.cardImg}`}>
        <Image src={'/'} alt="" fill></Image>
      </div>
      <div className={`${styles.cardBody} p-3`}>
        <div
          className={`${styles.weather} d-flex flex-nowrap align-items-center justify-content-center`}
        >
          <div className={`${styles.location}`}>
            <h5 className={`pe-3 mb-0`}>墾丁</h5>
          </div>
          <ul className={`d-flex align-items-center p-0 m-0`}>
            <li className={`me-4 `}>
              <i className="bi bi-brightness-high"></i>
              <p>32°C</p>
            </li>
            <li className={`me-4 `}>
              <i className="bi bi-sunset"></i>
              <p>18:00</p>
            </li>
            <li className={`me-4 `}>
              <i className="bi bi-wind"></i>
              <p>1.6m</p>
            </li>
            <li>
              <i className="bi bi-tsunami "></i>
              <p>3.4</p>
            </li>
          </ul>
        </div>
        <div className={`d-flex ${styles.content}`}>
          <p>
            墾丁適合潛水的海域：北起後灣，南到佳樂水，數十公里的海岸線有分佈著許多的珊瑚社群
            ，其中萬里桐、紅柴、南灣眺石.墾。適合潛水的海域：北起後灣，南到佳樂水，數十公里的海岸線有分佈著許多的珊瑚社群
            ，其中萬里桐、紅柴、南灣眺石......
          </p>
        </div>
      </div>
    </div>
  )
}
