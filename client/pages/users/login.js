import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Head from 'next/head'

// login with google
import useFirebase from '@/hooks/use-firebase'
// password visibility hook
import useShow from '@/hooks/use-password-visibility'

// React icon
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '@/hooks/auth'

// Alert
import { Toaster } from 'react-hot-toast'

export default function Login() {
  const { login, loginGoogle, auth, setMsg, errorMsg } = useAuth()
  const { loginGoogleRedirect, logoutFirebase, initGoogle } = useFirebase()
  const { type, icon, handleToggle } = useShow()

  // 初次渲染時監聽firebase的google登入狀態
  useEffect(() => {
    initGoogle(callbackGoogleLogin)
  }, [])

  // 將拿到的google資料進行處理
  const callbackGoogleLogin = (providerData) => {
    // 取得使用者的資料
    // 判斷當前是否已經登入，如果已登入就結束function（因為init本意為檢查是否登入，未登入才會執行其他事情）
    if (auth.isAuth) return
    // initGoogle取得資料並同步給其他function後，此處先將資料登出，避免google資料仍留存
    logoutFirebase()
    // 如果尚未登入，則執行登入流程
    loginGoogle(providerData)
  }

  // 表單驗證 START
  const [inputVal, setVal] = useState({
    emailVal: '',
    passwordVal: '',
  })

  useEffect(() => {
    setMsg('')
  }, [inputVal])

  const handleLogin = (e) => {
    e.preventDefault()
    const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    // \w+ 開頭包含數字、字母與底線至少一次
    // ([-+.]\w+)*@\w+ 可包含（-+.或其他數字、字母、底線至少一次）或完全沒有，並緊跟著@符號，接著數字、字母、底線至少一次
    // ([-.]\w+)*\.\w+ 可包含(-.或其他數字、字母、底線至少一次)或完全沒有，並緊跟著.符號，接著數字、字母、底線至少一次
    // ([-.]\w+)*$ 結尾需要包含數字、字母、底線至少一次
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}/
    switch (true) {
      case inputVal.emailVal.trim() === '':
        setMsg('電子郵件不得為空')
        break
      case !emailRegex.test(inputVal.emailVal):
        setMsg('電子郵件格式錯誤')
        break
      case inputVal.passwordVal.trim() === '':
        setMsg('密碼不得為空')
        break
      case !passwordRegex.test(inputVal.passwordVal):
        setMsg('請輸入8-12位數(含大小寫英文字母)')
        break
      default:
        login(e)
    }
  }
  // 表單驗證 END

  // 記住我 START
  const [isChecked, setIsChecked] = useState(Boolean)

  useEffect(() => {
    // 初始化取得先前存放的localStorage
    const checkedValue = localStorage.getItem('checked') === 'true'
    setIsChecked(checkedValue)
    // 先前未勾選並進入頁面時時 input 為 null
    const input = localStorage.getItem('email')
    // 如果input是null的話，表單驗證無法判斷
    input === null
      ? setVal({ ...inputVal, emailVal: '' })
      : setVal({ ...inputVal, emailVal: input })
  }, [])

  const handleChecked = (e) => {
    // 抓取被勾選
    const checked = e.target.checked
    const emailVal = inputVal.emailVal
    // 控制remember勾選後，input新增的localStorage的值
    if (checked) {
      localStorage.setItem('email', emailVal)
      localStorage.setItem('checked', 'true')
    } else {
      localStorage.removeItem('email')
      localStorage.setItem('checked', 'false')
    }

    setIsChecked(checked)
  }

  const handleInputVal = (e) => {
    const emailVal = e.target.value
    setVal({ ...inputVal, emailVal: emailVal })
    // 控制remember勾選後，input又變更時要更新的localStorage
    if (isChecked) {
      localStorage.setItem('email', emailVal)
    }
  }
  // 記住我 END
  return (
    <>
      <Head>
        <title>會員登入</title>
      </Head>
      <main className={`${styles['main-style']}`}>
        <div className="d-flex justify-content-center mt-5">
          <div className={`${styles['card-style']}`}>
            <form onSubmit={handleLogin}>
              <h2 className="fs-3 mb-4 text-center">會員登入</h2>
              <div className={`mb-3 ${styles['input-style']}`}>
                <input
                  type="text"
                  name="userEmail"
                  id="userEmail"
                  placeholder="請輸入"
                  onChange={handleInputVal}
                  value={inputVal.emailVal}
                />
                <label htmlFor="userEmail">電子郵件</label>
              </div>
              <div className={`position-relative ${styles['input-style']}`}>
                <input
                  type={type}
                  name="userPWD"
                  id="userPWD"
                  placeholder="請輸入8-12位(含大小寫英文字母)"
                  maxLength={12}
                  onChange={(e) =>
                    setVal({ ...inputVal, passwordVal: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="fs-4 position-absolute pb-3"
                  style={{
                    transform: 'translateY(-50%)',
                    top: '50%',
                    right: '8px',
                    border: 'none',
                    background: 'none',
                  }}
                  onClick={handleToggle}
                >
                  {icon}
                </button>
                <label htmlFor="userPWD">密碼</label>
              </div>
              {/* 記住我＆忘記密碼 */}
              <div className={`row justify-content-between ${styles.space}`}>
                <div className="col-auto">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      className="form-check-input"
                      onChange={handleChecked}
                      checked={isChecked}
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
              </div>
              {/* END */}
              {/* 警示標語 */}
              <div
                className={`fw-medium small text-center text-danger mb-0 ${styles.notify}`}
              >
                {errorMsg}
              </div>
              {/* END */}
              <button className={`fw-medium ${styles.btn}`}>
                登入
                <Toaster />
              </button>
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
