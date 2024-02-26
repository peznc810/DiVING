import React from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import Form from '@/components/dashboard/form/orders/order'

export default function Order() {
  return (
    <>
      <Head>
        <title>訂單記錄</title>
      </Head>
      <Menu />
      <Form />
    </>
  )
}
