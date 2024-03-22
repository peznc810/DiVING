import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import Form from '@/components/dashboard/form/orders'
// 使用者狀態的hook
import { useAuth } from '@/hooks/auth'

export default function Orders() {
  const { auth } = useAuth()
  const [order, setOrder] = useState([])

  const getUserOrder = async (id) => {
    const token = localStorage.getItem('token')
    const url = `http://localhost:3005/api/users/${id}/order`
    await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((result) => {
        setOrder(result.orderData)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (auth.id !== '') {
      getUserOrder(auth.id)
    }
  }, [auth])

  return (
    <>
      <Head>
        <title>訂單記錄</title>
      </Head>
      <Menu />
      <Form order={order} />
    </>
  )
}
