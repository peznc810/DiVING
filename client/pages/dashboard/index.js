import React from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/dashboard/profile')
  }
  // 這裡需要驗證是否有token，如果沒有token就轉跳到登入頁，如果有才可以轉跳到profile
  return <></>
}
