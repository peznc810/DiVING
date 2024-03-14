import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './coupon.module.scss'
// import { useCouponHas } from '@/hooks/use-couponHasData'

export default function CouponModal({
  setShowCoupon = () => {},
  showCoupon = false,
  couponHas = [],
  dataForParent = () => {},
}) {
  // const { couponHas, setCouponHas } = useCouponHas()
  const couponRefs = useRef([])
  const [selectedCoupon, setSelectedCoupon] = useState(null)

  // couponRefs.current的長度是依據couponHas
  useEffect(() => {
    couponRefs.current = couponHas.map(() => React.createRef())
  }, [couponHas])

  // 預設初次渲染focus的是第一個
  useEffect(() => {
    if (couponRefs.current.length > 0 && couponRefs.current[0].current) {
      couponRefs.current[0].current.focus()
    }
  }, [couponRefs.current])

  // 點擊傳選取的coupon，ref會回傳資訊
  const couponRefBtn = (couponRef) => {
    setSelectedCoupon(couponRef)
  }

  // 點擊傳選取的coupon資訊給父元件
  const handleOkBtn = () => {
    dataForParent(selectedCoupon) //callback
    console.log(selectedCoupon)
    setShowCoupon(false)
  }

  console.log(couponHas)
  return (
    <>
      <div
        className={` d-flex flex-column justify-content-center align-items-center ${
          styles.couponBlock
        } ${showCoupon ? 'd-block' : 'd-none'}`}
      >
        <div className={`${styles.couponModal}`}>
          <div className={`container py-4`}>
            <div
              className={`d-flex justify-content-between align-items-center mb-2 ${styles.title}`}
            >
              <p className={`m-0`}>選擇優惠卷</p>
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
            {/* 優惠卷列表 */}
            <div className={`${styles.listBlock}`}>
              {couponHas.map((v, i) => {
                return (
                  <div
                    //ref的callback function，點選後會回傳被選取的coupon的資料
                    ref={(el) => (couponRefs.current[i] = el)}
                    tabIndex={i}
                    className={`container ${styles.coupon} mb-2`}
                    key={v.id}
                    onClick={() => couponRefBtn(v)}
                  >
                    <div className={`row d-flex p-2 justify-content-start`}>
                      <div className={`col-2 ${styles.img}`}>
                        <Image
                          src="/images/coupons/turtle.jpg"
                          alt="turtle"
                          fill
                        />
                      </div>
                      <div className={`col-9 ${styles.name}`}>
                        <p className="m-0">{v.coupon_name}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className={`${styles.okBtn}`}
            onClick={handleOkBtn}
          >
            確定
          </button>
        </div>
      </div>
    </>
  )
}
