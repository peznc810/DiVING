import { useEffect } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { useAuth } from '@/hooks/auth'

export default function DefaultLayout({ currentPage, children }) {
  // 判斷路徑如果是/home 改變nav背景色
  const navBackground = currentPage === '/' ? 'transparent' : '#013c64'
  // 檢查會員登入狀態專用
  const { initUser } = useAuth()
  useEffect(() => {
    initUser()
  }, [])

  return (
    <>
      <Navbar background={navBackground} />
      {children}
      <Footer />
    </>
  )
}
