import React, { useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Head from 'next/head'

// login with google
import { useGoogleLogin } from '@react-oauth/google'
// React icon
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '@/hooks/auth'

export default function Login() {
  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      let url = 'http://localhost:3005/api/users/google-login'
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${codeResponse.access_token}`,
        },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  })
  const { login, setError, error } = useAuth()
  // const [input, setInput] = useState({
  //   emailVal: '',
  //   passwordVal: '',
  // })

  // const [formCheck, setFormCheck] = useState({
  //   email: true,
  //   password: true,
  // })

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  //   const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]){8,12}/
  //   switch (true) {
  //     case input.emailVal.trim() === '':
  //       setError('電子郵件不得為空')
  //       setFormCheck({ ...formCheck, email: false })
  //       break
  //     case !emailRegex.test(input.emailVal):
  //       setError('電子郵件格式錯誤')
  //       setFormCheck({ ...formCheck, email: false })
  //       break
  //     case input.passwordVal.trim() === '':
  //       setError('密碼不得為空')
  //       setFormCheck({ ...formCheck, password: false })
  //       break
  //     // case !passwordRegex.test(input.passwordVal):
  //     //   setError('帳號或密碼錯誤')
  //     //   break
  //     default:
  //       setFormCheck({ email: true, password: true, allCheck: true })
  //   }
  // }

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
                    className={`fw-medium small text-center text-danger mb-0 ${styles.notify}`}
                  >
                    {error}
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
                    className={`small ${styles.btn} w-100`}
                    onClick={() => loginGoogle()}
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
