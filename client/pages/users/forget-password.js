import React, { useState } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

export default function Forget() {
  const [errorMsg, setMsg] = useState('')
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const url = 'http://localhost:3005/api/otp/send'
    fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
      .then((result) => {
        if (result.ok) {
          router.push('/users/new-password')
        } else {
          setMsg('查無此使用者，請確認過後再輸入一次')
        }
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      <main className={`${styles['main-style']}`}>
        <div className="d-flex justify-content-center mt-5">
          <div className={`${styles['card-style']} ${styles['card-layout']}`}>
            <form onSubmit={handleSubmit}>
              <h2 className="text-center">忘記密碼</h2>
              <p className="small text-center">
                給一些有關忘記密碼的提示訊息，或須知文字
              </p>
              <div className={`${styles['input-style']} ${styles.limit}`}>
                <input
                  type="text"
                  name="userEmail"
                  id="userEmail"
                  placeholder="電子郵件"
                />
                <label htmlFor="userEmail">電子郵件</label>
              </div>
              {/* 警示標語 */}
              <div
                className={`fw-medium small text-center text-danger mb-0 ${styles.notify}`}
              >
                {errorMsg}
              </div>
              <button className={`fs-5 fw-medium ${styles.btn}`}>送出</button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
