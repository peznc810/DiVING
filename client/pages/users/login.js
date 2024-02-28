import React, { useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'

// React icon
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
  // 錯誤訊息的狀態
  const [error, setError] = useState({
    // Require Message
    emailReq: '',
    passwordReq: '',
    // Fill Error Message
    fillErr: '',
  })
  // 解譯token
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 建立自定義表單，並把form的資料格式放入
    let formData = new FormData(e.target)
    // console.log(e.target)

    // FormData本身不具可迭代性
    //因此需要透過entries()這個迭代器協助取出資料檢查
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`)
    // }
    let hasError = false
    let newError = {
      // Require Message
      emailReq: '',
      passwordReq: '',
      // Fill Error Message
      fillErr: '',
    }
    let url = 'http://localhost:3005/api/users/login'
    fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.status === 'error') {
          newError.fillErr = result.msg
          hasError = true
        } else {
          // 登入成功要做的事
          const token = result.token
          const userData = parseJwt(token)
          const { exp, iat, ...user } = userData
          for (let [key, value] of Object.entries(user)) {
            // console.log(`${key}: ${value}`)
            localStorage.setItem(key, value)
          }
          hasError = false
          Router.push('/dashboard')
        }

        if (hasError) {
          setError(newError)
          return
        }
      })
      .catch((err) => {
        console.log(err)
      }) /* 如果帳號或密碼錯誤這邊的err會多寫說undefine無法讀取split */
  }

  return (
    <>
      <Head>
        <title>會員登入</title>
      </Head>
      <main className={`${styles['main-style']} ${styles['main-layout']}`}>
        <div className="d-flex justify-content-center mt-5">
          <div className={`${styles['card-style']} ${styles['card-layout']}`}>
            <form onSubmit={handleSubmit} method="post">
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
                    <label htmlFor="remember" className="form-check-label">
                      記住我
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <Link href="/users/forget-password">忘記密碼?</Link>
                </div>
                {/* 警示標語 */}
                <div className="col-12">
                  <p
                    className={`fw-medium text-center text-danger mb-0 ${styles.notify}`}
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
                <div className="col-4 mt-3">
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
