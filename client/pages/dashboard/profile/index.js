import React from 'react'
import Head from 'next/head'
import styles from '@/pages/dashboard/index.module.scss'
import Menu from '@/components/dashboard/menu'
import Detail from '@/components/dashboard/profile'

export default function Profile() {
  return (
    <>
      <Head>
        <title>個人資料</title>
      </Head>
      <div className="container-xl my-4">
        <div
          className={`row justify-content-center m-auto ${styles['user-container']}`}
        >
          <Menu />
          <Detail />
        </div>
      </div>
    </>
  )
}
