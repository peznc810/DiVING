import React from 'react'
import Link from 'next/link'
import styles from './styles.module.scss'

// React icon
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '@/hooks/auth'

export default function SignUp() {
  const { signUp, error } = useAuth()
  return (
    <>
      <main className={`${styles['main-style']}`}>
        <div className="d-flex justify-content-center mt-5">
          <div className={`${styles['card-style']} ${styles['card-layout']}`}>
            <form onSubmit={signUp}>
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
                  name="userEmail"
                  id="userEmail"
                  placeholder="電子郵件"
                />
                <label htmlFor="userEmail">電子郵件</label>
              </div>
              <div className={`mb-3 ${styles['input-style']}`}>
                <input
                  type="password"
                  name="userPWD"
                  id="userPWD"
                  placeholder="密碼"
                />
                <label htmlFor="userPWD">密碼</label>
              </div>
              <div className={styles['input-style']}>
                <input
                  type="password"
                  name="rePWD"
                  id="rePWD"
                  placeholder="確認密碼"
                />
                <label htmlFor="rePWD">確認密碼</label>
              </div>
              {/* 警示標語 */}
              <p
                className={`fw-medium small text-center text-danger mb-0 ${styles.notify}`}
              >
                {error.fillErr ? error.fillErr : ''}
              </p>
              {/* END */}
              <button className={`fw-medium ${styles.btn}`}>註冊</button>
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
    </>
  )
}
