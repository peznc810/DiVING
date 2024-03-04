import React, { useEffect } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import Form from '@/components/dashboard/form/profile'
import { useAuth } from '@/hooks/auth'

export default function Profile() {
  const { initUser, user } = useAuth()
  useEffect(() => {
    initUser()
  }, [])

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
