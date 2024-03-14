import React, { useEffect } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import Form from '@/components/dashboard/form/profile'
import { useRouter } from 'next/router'
// 使用者狀態的hook
import { useAuth } from '@/hooks/auth'
// 表單驗證的hook
import useFormCheck from '@/hooks/use-form-check'
// Alert
import toast, { Toaster } from 'react-hot-toast'

export default function Profile() {
  const { auth, logout } = useAuth()
  const router = useRouter()
  const {
    handleProfileCheck,
    handlePWDCheck,
    userProfile,
    setUserProfile,
    setMsg,
    initMsg,
    password,
  } = useFormCheck()

  const notify = (msg, status) => {
    if (status === 'error') {
      toast.error(msg, {
        duration: 4000,
        position: 'top-center',
      })
    } else {
      toast.success(msg, {
        duration: 4000,
        position: 'top-center',
      })
    }
  }

  // GET Profile
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

  // Update API (不含密碼)
  const updateProfile = async (e) => {
    const user = new FormData(e.target)
    user.append('id', auth.id)
    const token = localStorage.getItem('token')
    const url = `http://localhost:3005/api/users/${auth.id}/profile`
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
        const { status, msg } = result
        notify(msg, status)
        // console.log(result.msg)
      })
      .catch((err) => console.log(err.msg))
  }
  // Update Profile（不含密碼）
  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    // 表單驗證
    handleProfileCheck()
    // if (formStatus) {
    //   await updateProfile(e)
    // }
  }

  // Update API (password)
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
  // Update password
  const handleUpdatePWD = (e) => {
    e.preventDefault()
    handlePWDCheck()
    // 表單驗證
    // const formStatus = handlePWDCheck()
    // if (formStatus) {
    //   updatePWD(e)
    // }
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
        handleUpdateProfile={handleUpdateProfile}
        handleUpdatePWD={handleUpdatePWD}
        notify={notify}
        Toaster={Toaster}
      />
    </>
  )
}
