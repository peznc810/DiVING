import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './coupon.module.scss'
import { motion } from 'framer-motion'
// 會員登入狀態
import { useAuth } from '@/hooks/auth'
import toast, { Toaster } from 'react-hot-toast'

export default function Coupon() {
  const [offsetTime, setOffsetTime] = useState(countDownTimer())
  const [showCoupon, setShowCoupon] = useState(true) //顯示coupon視窗
  const [couponData, setCouponData] = useState(false) //顯示coupon資訊
  const [codeShow, setCodeShow] = useState(false) // 顯示code

  const { auth } = useAuth()
  const textRef = useRef(null)

  const copyOK = () => {
    toast.success('複製成功', {
      style: {
        border: '1px solid #ff9720',
        padding: '16px',
        color: '#ff9720',
      },
      iconTheme: {
        primary: '#ff9720',
        secondary: '#FFFAEE',
      },
      onClose: setShowCoupon(false),
    })
  }

  const url = `http://localhost:3005/api/coupon/`
  // 連接資料庫
  useEffect(() => {
    fetch(url, {
      method: 'get',
    })
      .then((response) => {
        return response.json()
      })
      .then((results) => {
        console.log(results)
        setCouponData(results)
      })
      .catch(() => {
        console.log('連接錯誤')
      })
  }, [showCoupon, codeShow])

  // 複製文字
  function copyText() {
    const text = textRef.current.innerText
    navigator.clipboard
      .writeText(text)
      .then(() => copyOK())
      .catch((err) => console.error('複製失敗:', err))
  }

  // 滑鼠滾動coupon才出現
  // useEffect(() => {
  //   // 檢查 localStorage 中是否存在標誌，如果存在不要顯示coupon
  //   const couponClosedFlag = localStorage.getItem('couponClosed')
  //   if (couponClosedFlag) {
  //     setShowCoupon(false)
  //   }

  //   // 監聽滑鼠滾動
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY
  //     const position = 300
  //     // 如沒有couponClosedFlag且滾動超過300，coupon顯示
  //     if (!couponClosedFlag && scrollPosition > position) {
  //       setShowCoupon(true)
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])

  // closeBtn
  // const closeCouponBtn = () => {
  //   // 把關閉優惠卷的結果存在localStorage
  //   // localStorage.setItem('couponClosed', 'true')
  //   setShowCoupon(false)
  // }

  // 計時器
  useEffect(() => {
    let id = setInterval(() => {
      setOffsetTime(countDownTimer())
    }, 1000)
    return function () {
      clearInterval(id)
    }
  }, [offsetTime])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: 'tween',
          delay: 2,
          duration: 0.5,
          ease: 'easeIn',
        }}
        viewport={{ once: true }}
        className={`p-4  ${styles.couponBlock} ${
          showCoupon ? 'd-block' : 'd-none'
        }`}
      >
        <div
          className={`d-flex justify-content-between align-items-center mb-4 ${styles.title}`}
        >
          <h4 className={`fw-bold mb-0 text-light`}>DiVING 新春限時優惠！</h4>
          {/* 關掉按鈕 */}
          <button
            type="button"
            className={`p-0 `}
            aria-label="Close"
            onClick={() => {
              setShowCoupon(false)
            }}
          >
            <i className="bi bi-x-lg fs-4"></i>
          </button>
        </div>
        {/* 沒有點擊領取 */}
        {!codeShow && (
          <div>
            {/* 計時器 */}
            <div className={`${styles.timer} px-3 my-3`}>
              <ul className={`d-flex p-0 justify-content-around`}>
                <li>
                  <div>{offsetTime.days}</div>
                  <p>DAYS</p>
                </li>
                <li>
                  <div>{offsetTime.hours}</div>
                  <p>HOURS</p>
                </li>
                <li>
                  <div>{offsetTime.minutes}</div>
                  <p>MIN</p>
                </li>
                <li>
                  <div>{offsetTime.seconds}</div>
                  <p>SEC</p>
                </li>
              </ul>
            </div>
            {/* 優惠卷資訊 */}
            <div className={``}>
              <div>
                <div className={`container`}>
                  <div
                    className={`row d-flex align-items-center justify-content-between mb-4 ${styles.content}`}
                  >
                    <div className={`col-9 ${styles.info} `}>
                      <h5>{couponData.name}</h5>
                      <p className={`mb-0`}>活動期間：2/25-4/2</p>
                    </div>
                    <div className={`col-3 ${styles.discount}`}>
                      <p className={`mb-0 text-center`}>
                        優惠碼
                        <br />
                        {couponData.code}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`d-flex justify-content-end ${styles.getCodeBtn}`}
                >
                  {auth.isAuth ? (
                    <button
                      type="button"
                      onClick={() => {
                        setCodeShow(true)
                      }}
                    >
                      領取優惠碼
                    </button>
                  ) : (
                    <Link href={'/users/login'} className={`mt-0`}>
                      領取優惠碼
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 登入&點擊領取後出現 */}
        {couponData && codeShow && (
          <div className={`container`}>
            <div
              className={`${styles.copyCode} d-flex row align-items-center mb-4`}
            >
              <div className={`col-10`}>
                <p className={`my-3 text-center`} ref={textRef}>
                  {couponData.code}
                </p>
              </div>
              <div className={`col-2`}>
                <button
                  type="button"
                  onClick={() => {
                    copyText()
                  }}
                >
                  <i className="bi bi-copy"></i>
                </button>
              </div>
            </div>
            <p className={`text-center mb-0 text-light`}>
              複製優惠碼到會員中心領取優惠
            </p>
          </div>
        )}
      </motion.div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  )
}

// 倒數計時
function countDownTimer() {
  let year = new Date().getFullYear()
  let month = new Date().getMonth()

  let offset = null //代表兩個日期或時間點之間的時間差
  let countdown = {} // 儲存時間差的物件

  if (month > 10) {
    offset = new Date(`${4}/${1}/${year + 1}`) - new Date()
  } else {
    offset = new Date(`${4}/${1}/${year}`) - new Date()
  }

  if (offset > 0) {
    countdown = {
      days: Math.floor(offset / (1000 * 60 * 60 * 24)),
      hours: Math.floor((offset / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((offset / (1000 * 60)) % 60),
      seconds: Math.floor((offset / 1000) % 60),
    }
  }

  return countdown
}
