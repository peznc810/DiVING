import React from 'react'
import styles from './styles.module.css'
export default function Reset() {
  return (
    <>
      <header className={styles.header}></header>
      <main className={`${styles['main-style']} ${styles['main-layout']}`}>
        <div className="d-flex justify-content-center">
          <div className={`${styles['card-style']} ${styles['card-layout']}`}>
            {/* chrome會有一個自動填入的input功能，但無法修改其樣式，之後還是選用純色做背景較合適 */}
            <form action="" method="post" autoComplete="off">
              <h2 className="text-center">建立新密碼</h2>
              <p className="text-center">
                給一些有關新密碼的提示訊息，或須知文字
              </p>
              <div className={`mb-3 ${styles['input-style']}`}>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="密碼"
                />
                <label htmlFor="password">密碼</label>
              </div>
              <div className={`mb-3 ${styles['input-style']}`}>
                <input
                  type="password"
                  name="repassword"
                  id="repassword"
                  placeholder="確認密碼"
                />
                <label htmlFor="repassword">確認密碼</label>
              </div>
              {/* 警示標語 */}
              <p className="fw-medium text-center text-danger mb-0 d-none">
                帳號或密碼錯誤
              </p>
              {/* END */}
              <div className={`fs-5 fw-medium ${styles.btn}`}>送出</div>
            </form>
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </>
  )
}
