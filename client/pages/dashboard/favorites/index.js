import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import Form from '@/components/dashboard/form/favorites'
// 使用者狀態的hook
import { useAuth } from '@/hooks/auth'
import { notify } from '@/hooks/use-alert'
import { Toaster } from 'react-hot-toast'

export default function Favorites() {
  const { auth } = useAuth()
  const [fav, setFav] = useState([])

  const getUserFav = async (id) => {
    const token = localStorage.getItem('token')
    const url = `http://localhost:3005/api/users/${id}/favorite`
    await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((result) => {
        setFav(result.data)
      })
      .catch((err) => console.log(err))
  }

  const delUserFav = async (id, pid) => {
    const newFav = fav.filter((item) => {
      return item.id !== pid
    })
    setFav(newFav)

    const token = localStorage.getItem('token')
    const url = `http://localhost:3005/api/users/${id}/delete-fav${pid}`
    await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((result) => {
        const { status, msg } = result
        notify(msg, status)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (auth.id !== '') {
      getUserFav(auth.id)
    }
  }, [auth, fav])

  return (
    <>
      <Head>
        <title>我的收藏</title>
      </Head>
      <Toaster />
      <Menu />
      <Form fav={fav} auth={auth} delUserFav={delUserFav} />
    </>
  )
}
