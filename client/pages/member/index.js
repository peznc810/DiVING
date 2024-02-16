import React from 'react'
import styles from './styles.module.css'

export default function Profile() {
  return (
    <>
      <main className={styles.main}>
        <div
          className={`d-flex justify-content-center align-items-center ${styles.card}`}
        >
          {/* col預設flex是flex: 0 0 auto,所以option會被壓縮，不符合一開始在figma設計的樣子 */}
          <div className={`col-3 ${styles['option-container']}`}>
            {/* 讓圖片置中 */}
            <div className="w-100 d-flex justify-content-center">
              <div className={`${styles.avatar}`}>
                <img src="/images/users/woman.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className={`col-5 ${styles['form-container']}`}>
            <form action=""></form>
          </div>
        </div>
      </main>
    </>
  )
}
