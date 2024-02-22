import React from 'react'
import Link from 'next/link'
import styles from './styles.module.scss'

export default function SignUp() {
  return (
    <>
      <header className={styles.header}></header>
      <main className={`${styles['main-style']} ${styles['main-layout']}`}>
        <div className="d-flex justify-content-center">
          <div className={`${styles['card-style']} ${styles['card-layout']}`}>
            {/* chrome會有一個自動填入的input功能，但無法修改其樣式，之後還是選用唇色做背景較合適 */}
            <form action="" method="post" autoComplete="off">
              <h2 className="fs-3 mb-4 text-center">註冊會員</h2>
              <div className={`mb-3 ${styles['input-style']}`}>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="姓名"
                />
                <label htmlFor="userName">姓名</label>
              </div>
              <div className={`mb-3 ${styles['input-style']}`}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="電子郵件"
                />
                <label htmlFor="email">電子郵件</label>
              </div>
              <div className={`mb-3 ${styles['input-style']}`}>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="密碼"
                />
                <label htmlFor="password">密碼</label>
              </div>
              <div className={styles['input-style']}>
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
              <div className={`fw-medium ${styles.btn}`}>註冊</div>
              <div className="social">
                <div
                  className={`d-flex justify-content-center align-items-center ${styles.title}`}
                >
                  社群帳號註冊
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <div className={`small ${styles.btn}`}>
                    <i class="bi bi-google me-2"></i>Google
                  </div>
                  <div className={`ms-3 small ${styles.btn}`}>
                    <i class="bi bi-facebook me-2"></i>Facebook
                  </div>
                </div>
              </div>
              <p className="text-center mb-0">
                已經有帳號嗎?
                <Link href="/users" className="ps-1 text-secondary fw-bold">
                  立即登入
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </>
  )
}
