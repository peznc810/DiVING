import React, { useEffect, useState } from 'react'
import { useShip711StoreOpener } from '@/hooks/use-711-store'

import styles from '../cart.module.scss'

export default function Store711({
  handleInputChange,
  userInputs,
  setUserInputs,
  cUser,
}) {
  const { store711, openWindow } = useShip711StoreOpener(
    'http://localhost:3005/api/shipment/711',
    { autoCloseMins: 3 } // x分鐘沒完成選擇會自動關閉，預設5分鐘。
  )

  const deliveryChange = () => {
    const { name, tel } = cUser
    setUserInputs((prevState) => ({
      ...prevState,
      user_name: name,
      user_phone: tel,
    }))
  }

  useEffect(() => {
    setUserInputs((s) => ({
      ...s,
      store_name: store711.storename,
      store_address: store711.storeaddress,
    }))
  }, [store711])

  return (
    <>
      <div className="container">
        <div className={`w-100 ${styles.sectionName} text-center"`}>
          <h5 className={`${styles.span}`}>送貨資料</h5>
        </div>
        <div className="container">
          <div className="d-flex mt-3">
            <input
              type="checkbox"
              className="deliver_cb"
              onClick={() => deliveryChange()}
            />
            <h6 className="fw-bold">收貨人資料與會員資料相同</h6>
          </div>
          <div className={`row justify-content-between ${styles.spacing}`}>
            <div className="col-6">
              <p className="fw-bold">收件人名稱</p>
              <input
                type="text"
                className="w-100 form-control user_name"
                name="user_name"
                defaultValue={userInputs.user_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <p className="fw-bold">收件人電話</p>
              <input
                type="text"
                className="w-100 form-control user_phone"
                name="user_phone"
                defaultValue={userInputs.user_phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <p className="fw-bold">門市名稱</p>
              <input
                type="text"
                className="w-100 form-control user_name"
                name="store_name"
                defaultValue={store711.storename}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="col-6">
              <p className="fw-bold">門市地址</p>
              <input
                type="text"
                className="w-100 form-control user_phone"
                name="store_address"
                defaultValue={store711.storeaddress}
                onChange={handleInputChange}
                disabled
              />
            </div>
          </div>
          <div className="text-end">
            <button
              className="text-end btn next-step-btn text-white px-5"
              onClick={() => {
                openWindow()
                console.log(localStorage.getItem('store711'))
              }}
            >
              選擇7-11門市
            </button>
          </div>

          <br />
        </div>
      </div>
      <style jsx>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
        }

        .row div {
          margin-bottom: 1.5rem;
        }

        .next-step-btn {
          background-color: #ff9720;
        }
      `}</style>
    </>
  )
}
