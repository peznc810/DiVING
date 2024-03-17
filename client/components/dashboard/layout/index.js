import React from 'react'
import styles from './styles.module.scss'

export default function DashboardLayout({ children }) {
  return (
    <>
      <main className="my-3 my-sm-5">
        <div className="container-xl">
          <div
            className={`row justify-content-center m-auto position-relative ${styles['user-container']}`}
          >
            {/* 這裡放管理中心component */}
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
