import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'

// only redirect to member/login
export default function UsersIndex() {
  const router = useRouter()
  const { auth } = useAuth()
  // Make sure we're in the browser
  if (typeof window !== 'undefined' && !auth.isAuth) {
    router.push('/users/login')
  }

  return <></>
}
