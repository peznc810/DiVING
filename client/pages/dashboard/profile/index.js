import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import Form from '@/components/dashboard/form/profile'
import { useAuth } from '@/hooks/auth'

export default function Profile() {
  const { auth } = useAuth()
  const initUserProfile = {
    name: '',
    email: '',
    birth: '',
    tel: '',
    address: '',
  }
  // 取得dbData
  const [userProfile, setUserProfile] = useState(initUserProfile)
  const getUserProfile = async (id) => {
    const token = localStorage.getItem('token')
    const url = `http://localhost:3005/api/users/${id}`
    await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((result) => {
        const dbUser = result.userData
        const dbUserProfile = { ...userProfile }
        for (const key in dbUserProfile) {
          if (Object.hasOwn(dbUser, key)) {
            // 這裡要將null值的預設值改為空字串 ''
            dbUserProfile[key] = dbUser[key] || ''
          }
        }
        setUserProfile(dbUserProfile)
      })
      .catch((err) => console.log(err))
  }

  // 抓取表單欄位變動的值
  const [newProfile, setProfile] = useState({})
  const handleChangeProfile = (e) => {
    setProfile({ ...newProfile, [e.target.name]: e.target.value })
  }

  // 更新dbData
  const updateProfile = async (id, profile) => {
    const url = `http://localhost:3005/api/users/${id}/profile`
    const data = profile.JSON.stringify()
    const token = localStorage.getItem('token')
    await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      credentials: 'include',
    })
      .then((res) => res.JSON())
      .then((result) => console.log(result))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (auth.id !== '') {
      getUserProfile(auth.id)
    }
  }, [auth])

  useEffect(() => {
    setProfile(userProfile)
  }, [userProfile])
  return (
    <>
      <Head>
        <title>個人資料</title>
      </Head>
      <Menu />
      <Form
        userProfile={userProfile}
        handleVal={handleChangeProfile}
        newProfile={newProfile}
        updateProfile={updateProfile}
      />
    </>
  )
}
