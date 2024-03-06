import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'

export default function MemberIndex() {
  const router = useRouter()
  const { auth } = useAuth()
  // Make sure we're in the browser
  if (typeof window !== 'undefined' && auth.isAuth) {
    router.push('/dashboard/profile')
  }
  return <></>
}
