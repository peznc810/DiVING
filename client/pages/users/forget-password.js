import React from 'react'
import styles from './styles.module.scss'

export default function Forget() {
  return (
    <>
      <header className={styles.header}></header>
      <main className={`${styles['main-style']} ${styles['main-layout']}`}>
        <div className="d-flex justify-content-center">
          <div className={`${styles['card-style']} ${styles['card-layout']}`}>
            {/* chrome會有一個自動填入的input功能，但無法修改其樣式，之後還是選用唇色做背景較合適 */}
            <form action="" method="post" autoComplete="off">
              <h2 className="text-center">忘記密碼</h2>
              <p className="small text-center">
                給一些有關忘記密碼的提示訊息，或須知文字
              </p>
              <div className={`mb-3 ${styles['input-style']} ${styles.limit}`}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="電子郵件"
                />
                <label htmlFor="email">電子郵件</label>
                {/* 警示標語 */}
                <div className="fw-normal text-danger position-absolute">
                  格式錯誤
                </div>
              </div>
              <div className={`fs-5 fw-medium ${styles.btn}`}>送出</div>
            </form>
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </>
  )
}
