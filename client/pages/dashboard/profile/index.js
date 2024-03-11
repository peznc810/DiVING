import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import Form from '@/components/dashboard/form/profile'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import useFormCheck from '@/hooks/form-check'

export default function Profile() {
  const { auth, logout } = useAuth()
  const { handleChangePWD, handleCheck, errorMsg, setMsg, initMsg, password } =
    useFormCheck()
  const router = useRouter()

  // 初始化
  const initUserProfile = {
    name: '',
    email: '',
    birth: '',
    tel: '',
    address: '',
  }

  const [userProfile, setUserProfile] = useState(initUserProfile)

  // Fetch Profile
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
          // 檢查dbUser中有沒有dbUserProfile的屬性
          if (Object.hasOwn(dbUser, key)) {
            // 這裡要將null值的預設值改為空字串 ''
            dbUserProfile[key] = dbUser[key] || ''
          }
        }
        setUserProfile(dbUserProfile)
      })
      .catch((err) => console.log(err))
  }

  // 抓取改變的欄位
  const handleChangeProfile = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value })
  }

  // 更新db（不含密碼）
  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    const user = new FormData(e.target)
    user.append('id', auth.id)
    const token = localStorage.getItem('token')
    const url = `http://localhost:3005/api/users/${auth.id}/profile`
    await fetch(url, {
      method: 'PUT',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: user,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => console.log(result.msg))
      .catch((err) => console.log(err.msg))
  }

  // Fetch Update API
  const updatePWD = async (e) => {
    const user = new FormData(e.target)
    user.append('id', auth.id)
    const token = localStorage.getItem('token')
    const url = `http://localhost:3005/api/users/${auth.id}/password`
    await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: user,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'success') {
          console.log(result.msg)
          logout()
          router.push('/users')
        }
      })
      .catch((err) => console.log(err.msg))
  }

  // 更新密碼
  const handleUpdatePWD = (e) => {
    e.preventDefault()
    // 表單驗證
    const formStatus = handleCheck()
    if (formStatus) {
      updatePWD(e)
    }
  }

  // 取得資料後，再更新一次
  useEffect(() => {
    if (auth.id !== '') {
      getUserProfile(auth.id)
    }
  }, [auth])

  useEffect(() => {
    setMsg(initMsg)
  }, [password])

  return (
    <>
      <Head>
        <title>個人資料</title>
      </Head>
      <Menu />
      <Form
        userProfile={userProfile}
        handleChangeProfile={handleChangeProfile}
        handleUpdateProfile={handleUpdateProfile}
        handleChangePWD={handleChangePWD}
        handleUpdatePWD={handleUpdatePWD}
        errorMsg={errorMsg}
      />
    </>
  )
}
