import React from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/dashboard/profile')
  }
  return <></>
}
