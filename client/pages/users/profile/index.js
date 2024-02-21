import React from 'react'
import Head from 'next/head'
import styles from './profile.module.scss'
// import ProfileMenu from './menu'

export default function Profile() {
  return (
    <>
      <Head>
        <title>個人資料</title>
      </Head>
      <main>
        <div className="container-xl my-3">
          <div className={`row m-auto ${styles['profile-container']}`}>
            <div
              className={`col rounded-start ${styles['menu-container']}`}
            ></div>
            <div
              className={`col border border-1 border-primary rounded-end ${styles['form-container']}`}
            ></div>
          </div>
        </div>
      </main>
    </>
  )
}
