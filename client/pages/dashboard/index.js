import React from 'react'
import Head from 'next/head'
import Profile from './profile'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>個人資料</title>
      </Head>
      <main className="mt-5 pt-4">
        {/* class要拿掉 */}
        <Profile />
      </main>
    </>
  )
}
