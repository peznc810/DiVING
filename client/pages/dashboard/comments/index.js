import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import Form from '@/components/dashboard/form/comments'
// 使用者狀態的hook
import { useAuth } from '@/hooks/auth'

export default function Orders() {
  const { auth } = useAuth()
  const [common, setCommon] = useState([])

  const getUserCommon = async (id) => {
    const token = localStorage.getItem('token')
    const url = `http://localhost:3005/api/users/${id}/common`
    await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((result) => {
        setCommon(result.commonData)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (auth.id !== '') {
      getUserCommon(auth.id)
    }
  }, [auth])

  return (
    <>
      <Head>
        <title>我的評論</title>
      </Head>
      <Menu />
      <Form common={common} />
    </>
  )
}
