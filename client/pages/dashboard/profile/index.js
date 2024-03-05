import React from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import Form from '@/components/dashboard/form/profile'

export default function Profile() {
  return (
    <>
      <Head>
        <title>個人資料</title>
      </Head>
      <Menu />
      <Form />
    </>
  )
}
