import React from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import Form from '@/components/dashboard/form/posts'

export default function Orders() {
  return (
    <>
      <Head>
        <title>我的文章</title>
      </Head>
      <Menu />
      <Form />
    </>
  )
}
