import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Head from 'next/head'

// login with google
import useFirebase from '@/hooks/use-firebase'

// React icon
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '@/hooks/auth'

export default function Login() {
  const { login, loginGoogle, auth } = useAuth()
  const { loginGoogleRedirect, logoutFirebase, initGoogle } = useFirebase()

  // 初次渲染時監聽firebase的google登入狀態
  useEffect(() => {
    initGoogle(callbackGoogleLogin)
  }, [])

  // 將拿到的google資料進行處理
  const callbackGoogleLogin = (providerData) => {
    // 取得使用者的資料
    // console.log(providerData)
    // 判斷當前是否已經登入，如果已登入就結束function（因為init本意為檢查是否登入，未登入才會執行其他事情）
    if (auth.isAuth) return
    // initGoogle取得資料並同步給其他function後，此處先將資料登出，避免google資料仍留存
    logoutFirebase()
    // 如果尚未登入，則執行登入流程
    loginGoogle(providerData)
  }

  return (
    <>
      <Head>
        <title>會員登入</title>
      </Head>
      <main className={`${styles['main-style']}`}>
        <div className="d-flex justify-content-center mt-5">
          <div className={`${styles['card-style']}`}>
            {/* login的訊息會慢一拍過來 */}
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
              <div className={`${styles['input-style']}`}>
                <input
                  type="text"
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
                    忘記密碼？
                  </Link>
                </div>
                {/* 警示標語 */}
                <div className="col-12">
                  <p
                    className={`fw-medium small text-center text-danger mb-0 position-absolute ${styles.notify}`}
                  >
                    {/* config error */}
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
                <div className="col-10 mt-3 text-center">
                  <button
                    type="button"
                    className={`small ${styles.btn} w-100`}
                    onClick={loginGoogleRedirect}
                  >
                    <FcGoogle className="me-2" />
                    使用 Google 帳號登入
                  </button>
                </div>
              </div>
              <p className="text-center mb-0 small">
                還沒有帳號嗎？
                <Link
                  href="/users/register"
                  className="text-secondary fw-medium"
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
