import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

export default function Login() {
  return (
    <>
      <main className={`${styles['main-style']} ${styles['main-layout']}`}>
        <div className="d-flex justify-content-center">
          <div className={`${styles['card-style']} ${styles['card-layout']}`}>
            {/* chrome會有一個自動填入的input功能，但無法修改其樣式，之後還是選用唇色做背景較合適 */}
            <form action="" method="post">
              <h2 className="fs-3 mb-4 text-center">會員登入</h2>
              <div className={`mb-3 ${styles['input-style']}`}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="電子郵件"
                  autoComplete="email"
                />
                <label htmlFor="email">電子郵件</label>
              </div>
              <div className={styles['input-style']}>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="密碼"
                />
                <label htmlFor="password">密碼</label>
              </div>
              {/* 記住我＆忘記密碼 */}
              <div
                className={`d-flex justify-content-between small ${styles.space}`}
              >
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="form-check-input"
                  />
                  <label htmlFor="remember" className="form-check-label">
                    記住我
                  </label>
                </div>
                <Link href="/users/forget-password">忘記密碼?</Link>
              </div>
              {/* END */}
              {/* 警示標語 */}
              <p className="fw-medium text-center text-danger mb-0 d-none">
                帳號或密碼錯誤
              </p>
              {/* END */}
              <div className={`fw-medium ${styles.btn}`}>登入</div>
              <div className="social">
                <div
                  className={`d-flex justify-content-center align-items-center mt-2 small ${styles.title}`}
                >
                  社群帳號登入
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <div className={`small ${styles.btn}`}>
                    <i className="bi bi-google me-2"></i>Google
                  </div>
                  <div className={`ms-3 small ${styles.btn}`}>
                    <i className="bi bi-facebook me-2"></i>Facebook
                  </div>
                </div>
              </div>
              <p className="text-center mb-0 small">
                還沒有帳號嗎?
                <Link
                  href="/users/register"
                  className="ps-1 text-secondary fw-bold"
                >
                  立即註冊
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
