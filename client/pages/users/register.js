import { useEffect } from 'react'
import Link from 'next/link'
import styles from './styles.module.scss'

// React icon
import { FcGoogle } from 'react-icons/fc'

// defult auth
import { useAuth } from '@/hooks/auth'
// google auth
import useFirebase from '@/hooks/use-firebase'

export default function SignUp() {
  const { signUp, signUpGoogle, auth } = useAuth()
  const { loginGoogleRedirect, initGoogle, logoutFirebase } = useFirebase()

  // 初次渲染時監聽firebase的google登入狀態
  useEffect(() => {
    console.log('register')
    initGoogle(callbackGoogleSign)
    // logoutFirebase() /* 測試用之後可以拔掉 */
  }, [])

  // 將拿到的google資料進行處理
  const callbackGoogleSign = (providerData) => {
    // 取得使用者的資料
    // console.log(providerData)
    // 判斷當前是否已經登入，如果已登入就結束function（因為init本意為檢查是否登入，未登入才會執行其他事情）
    if (auth.isAuth) return
    // initGoogle取得資料並同步給其他function後，此處先將資料登出，避免google資料仍留存
    logoutFirebase()
    // 如果尚未登入，則執行註冊流程
    signUpGoogle(providerData)
  }
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
                className={`fw-medium small text-center text-danger mb-0 position-absolute ${styles.notify}`}
              >
                {/* config error */}
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
                <div className="col-10 mt-3 text-center">
                  <button
                    type="button"
                    className={`small ${styles.btn} w-100`}
                    onClick={loginGoogleRedirect}
                  >
                    <FcGoogle className="me-2" />
                    使用 Google 帳號註冊
                  </button>
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
