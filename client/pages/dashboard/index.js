import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import { useEffect } from 'react'

export default function MemberIndex() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user.valid) {
      router.push('/dashboard/profile')
    } else {
      router.push('/users/')
    }
  }, [user.valid, router])
  return <></>
}
