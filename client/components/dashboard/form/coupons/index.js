import React, { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import Image from 'next/image'
import Swal from 'sweetalert2'
import { useCouponHas } from '@/hooks/use-couponHasData'

export default function Form() {
  const { couponHas, auth, authID, setCouponHas } = useCouponHas()
  const [inputCode, setInputCode] = useState('')
  const [errorText, setErrorText] = useState(false)

  const input = (e) => {
    e.preventDefault()
    const inputValue = e.target.value.toLocaleUpperCase()
    e.target.value = ''
    setInputCode(inputValue)
  }

  // 點擊按鈕把資料傳給後端領取優惠卷
  const submitBtn = async (inputCode, authID) => {
    try {
      // 如果沒有輸入文字顯示錯誤
      if (inputCode === '') {
        setErrorText(true)
        return
      }

      // 連接API
      const url = 'http://localhost:3005/api/coupon'
      const response = await fetch(url, {
        method: 'post',
        headers: {
          //設定 HTTP 請求標頭，告訴伺服器發送的資料是 JSON 格式
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          inputCode,
          authID,
        }),
      })
      const results = await response.json()
      // console.log(results)
      if (results.status === 'success') {
        // 領取優惠卷成功後重新讀取會員的有的優惠卷
        const url = `http://localhost:3005/api/coupon/${authID}`
        await fetch(url, {
          method: 'get',
        })
          .then((response) => {
            return response.json()
          })
          .then((results) => {
            setCouponHas(results)
          })
          .catch(() => {
            console.log('error')
          })
        // 領取成功視窗
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '領取成功',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '領取失敗',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch {
      console.log('連線失敗')
    }
  }

  return (
    <>
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion">
            <div className="accordion-header">
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">優惠券</h2>
            </div>
            <div className={` container `}>
              <div
                className={` px-4 ${styles.errorBlock} ${
                  errorText ? 'd-block' : 'd-none'
                }`}
              >
                <p className="p-0">error：請輸入優惠碼！</p>
              </div>
            </div>
            <div className="accordion-body">
              {/* 篩選＆搜尋，要再調整 */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <button type="button" className="btn btn-sm text-secondary">
                    可使用
                  </button>
                  |
                  <button type="button" className="btn btn-sm">
                    已失效
                  </button>
                </div>
                <div className="d-flex justify-content-end">
                  <input
                    type="text"
                    className="form-control w-50 h-50 me-2"
                    value={inputCode}
                    onChange={(e) => {
                      // e.preventDefault()
                      // setInputCode(e.target.value.toLocaleUpperCase())
                      input(e)
                    }}
                    placeholder="輸入優惠碼..."
                  />

                  <button
                    className={`btn btn-sm btn-outline-secondary ${styles['hover-style']}`}
                    onClick={() => {
                      submitBtn(inputCode, authID)
                    }}
                  >
                    領取
                  </button>
                </div>
              </div>
              {/* 這裡之後要再跟成List跟Item的component */}
              <div className="mb-5">
                <div className={`row g-3 ${styles.card}`}>
                  {/* 卡片本體 */}
                  {couponHas.map((v) => {
                    return (
                      <div className="col-12 col-md-6" key={v.id}>
                        <div className=" d-flex border border-info rounded p-3 h-100">
                          <div
                            className={`rounded ${styles.avatar} flex-shrink-0 me-3`}
                          >
                            <Image
                              src="/images/coupons/turtle.jpg"
                              alt="turtle"
                              fill
                            />
                          </div>
                          <div className="right flex-grow-1">
                            <h4 className="fs-6">{v.coupon_name}</h4>
                            <p className={`${styles.rule}`}>
                              {v.coupon_rule_content}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* 頁數按鈕 */}
              <div className="d-flex justify-content-center">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="First group"
                >
                  {/* 要map */}
                  <button
                    type="button"
                    className={`btn btn-outline-secondary btn-sm ${styles['hover-style']}`}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-secondary btn-sm ${styles['hover-style']}`}
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-secondary btn-sm ${styles['hover-style']}`}
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-secondary btn-sm ${styles['hover-style']}`}
                  >
                    4
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
