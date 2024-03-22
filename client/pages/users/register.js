import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './styles.module.scss'

// React icon
import { FcGoogle } from 'react-icons/fc'

// default auth
import { useAuth } from '@/hooks/auth'
// google auth
import useFirebase from '@/hooks/use-firebase'
// password visibility hook
import useShow from '@/hooks/use-password-visibility'
// Alert
import { Toaster } from 'react-hot-toast'
// loading
import Loading from '@/components/layout/loading/loading'

export default function SignUp() {
  const { signUp, auth, setMsg, errorMsg } = useAuth()
  const { loginGoogleRedirect, initGoogle, logoutFirebase } = useFirebase()
  const { type, icon, handleToggle } = useShow()
  const [loading, setLoading] = useState(true)

  const [inputVal, setVal] = useState({
    userName: '',
    userEmail: '',
    userPWD: '',
    rePWD: '',
  })

  const handleVal = (e) => {
    setVal({ ...inputVal, [e.target.name]: e.target.value })
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}/
    switch (true) {
      case inputVal.userName.trim() === '':
        setMsg('姓名為必填欄位')
        break
      case inputVal.userEmail.trim() === '':
        setMsg('電子郵件為必填欄位')
        break
      case !emailRegex.test(inputVal.userEmail):
        setMsg('電子郵件格式錯誤')
        break
      case inputVal.userPWD.trim() === '':
        setMsg('密碼不得為空')
        break
      case !passwordRegex.test(inputVal.userPWD):
        setMsg('請輸入8-12位數(含英文大小寫)')
        break
      case inputVal.rePWD.trim() === '':
        setMsg('請再確認一次密碼')
        break
      case inputVal.userPWD !== inputVal.rePWD:
        setMsg('密碼不符')
        break
      default:
        signUp(e)
    }
  }

  // 初次渲染時監聽firebase的google登入狀態
  useEffect(() => {
    setMsg('')
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    setMsg('')
  }, [inputVal])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <main className={`${styles['main-style']}`}>
            <div className="d-flex justify-content-center">
              <div
                className={`${styles['card-style']} ${styles['card-layout']}`}
              >
                <form onSubmit={handleSignUp}>
                  <h2 className="fs-3 mb-4 text-center">註冊會員</h2>
                  <div className={`mb-3 ${styles['input-style']}`}>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      placeholder="姓名"
                      onChange={handleVal}
                    />
                    <label htmlFor="userName">姓名</label>
                  </div>
                  <div className={`mb-3 ${styles['input-style']}`}>
                    <input
                      type="text"
                      name="userEmail"
                      id="userEmail"
                      placeholder="電子郵件"
                      onChange={handleVal}
                    />
                    <label htmlFor="userEmail">電子郵件</label>
                  </div>
                  <div
                    className={`position-relative mb-3 ${styles['input-style']}`}
                  >
                    <input
                      type={type}
                      name="userPWD"
                      id="userPWD"
                      placeholder="請輸入8-12位(含大小寫英文字母)"
                      maxLength={12}
                      onChange={handleVal}
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
                  <div className={styles['input-style']}>
                    <input
                      type="password"
                      name="rePWD"
                      id="rePWD"
                      placeholder="請再輸入一次"
                      maxLength={12}
                      onChange={handleVal}
                    />
                    <label htmlFor="rePWD">確認密碼</label>
                  </div>
                  {/* 警示標語 */}
                  <p
                    className={`fw-medium small text-center text-danger mb-0 ${styles.notify}`}
                  >
                    {errorMsg}
                  </p>
                  {/* END */}
                  <button className={`fw-medium ${styles.btn}`}>註冊</button>
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
      )}

      <Toaster />
    </>
  )
}
