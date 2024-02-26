import React from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import Form from '@/components/dashboard/form/posts/newpost'

export default function Edit() {
  return (
    <>
      <Head>
        <title>編輯文章</title>
      </Head>
      <Menu />
      <Form />
    </>
  )
}
