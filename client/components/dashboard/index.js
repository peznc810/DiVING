import React from 'react'
import styles from './index.module.scss'

export default function DashboardLayout({ children }) {
  return (
    <>
      {/* 這裡的class之後要拿掉 */}
      <main className="mt-5 pt-4">
        <div className="container-xl my-4">
          <div
            className={`row justify-content-center m-auto ${styles['user-container']}`}
          >
            {/* 這裡放管理中心component */}
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
