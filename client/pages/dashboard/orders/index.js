import React from 'react'
import Head from 'next/head'
import styles from '@/pages/dashboard/index.module.scss'
import Menu from '@/components/dashboard/menu'
import Detail from '@/components/dashboard/orders'

export default function Orders() {
  return (
    <>
      <Head>
        <title>訂單記錄</title>
      </Head>
      <main className="mt-5 pt-4">
        <div className="container-xl my-4">
          <div
            className={`row justify-content-center m-auto ${styles['user-container']}`}
          >
            <Menu />
            <Detail />
          </div>
        </div>
      </main>
    </>
  )
}
