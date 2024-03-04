import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.push('/dashboard/profile')
  } else {
    return (
      <>
        {/* 這邊之後要改成..導向登入頁 */}
        <h2>請重新登入</h2>
      </>
    )
  }
  // Make sure we're in the browser

  // 這裡需要驗證是否有token，如果沒有token就轉跳到登入頁，如果有才可以轉跳到profile
  return <></>
}
