import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Head from 'next/head'

// React icon
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '@/hooks/auth'

export default function Login() {
  const { login, error, user } = useAuth()
  // console.log(user)
  return (
    <>
      <Head>
        <title>會員登入</title>
      </Head>
      <main className={`${styles['main-style']} ${styles['main-layout']}`}>
        <div className="d-flex justify-content-center mt-5">
          <div className={`${styles['card-style']} ${styles['card-layout']}`}>
            <form onSubmit={login}>
              <h2 className="fs-3 mb-4 text-center">會員登入</h2>
              <div className={`mb-3 ${styles['input-style']}`}>
                <input
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  placeholder="電子郵件"
                  autoComplete="email"
                />
                <label htmlFor="userEmail">電子郵件</label>
              </div>
              <div className={styles['input-style']}>
                <input
                  type="password"
                  name="userPWD"
                  id="userPWD"
                  placeholder="密碼"
                />
                <label htmlFor="userPWD">密碼</label>
              </div>
              {/* 記住我＆忘記密碼 */}
              <div
                className={`row justify-content-between gy-1 ${styles.space}`}
              >
                <div className="col-auto">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      className="form-check-input"
                    />
                    <label
                      htmlFor="remember"
                      className="form-check-label small"
                    >
                      記住我
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <Link href="/users/forget-password" className="small">
                    忘記密碼?
                  </Link>
                </div>
                {/* 警示標語 */}
                <div className="col-12">
                  <p
                    className={`fw-medium small text-center text-danger mb-0 ${styles.notify}`}
                  >
                    {error.fillErr ? error.fillErr : ''}
                  </p>
                </div>
                {/* END */}
              </div>
              {/* END */}
              <button className={`fw-medium ${styles.btn}`}>登入</button>
              <div className="row justify-content-center align-items-center">
                <div className="col-10">
                  <div
                    className={`d-flex justify-content-center align-items-center mt-2 small ${styles.title}`}
                  >
                    或
                  </div>
                </div>
                <div className="col-6 mt-3">
                  <div className={`small ${styles.btn}`}>
                    <FcGoogle className="me-2" />
                    Google
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
