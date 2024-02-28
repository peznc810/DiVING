import { useRouter } from 'next/router'

// only redirect to member/login
export default function UsersIndex() {
  const router = useRouter()
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/users/login')
  }

  return <></>
}
