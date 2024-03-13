import '@/styles/globals.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'

// 會員中心的預設樣式
import DashboardLayout from '@/components/dashboard/layout'
// 會員驗證專用provider component
import { AuthProvider } from '@/hooks/auth'
// 共享event資料context
import EventProvider from '@/hooks/use-eventData'
// 共享coupon資料context
import CouponHasProvider from '@/hooks/use-couponHasData'

export default function App({ Component, pageProps }) {
  // 獲取當前頁面路徑
  const router = useRouter()
  const currentPage = router.pathname
  // console.log(useAuth)

  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  const getLayout = (children) => {
    // 會員中心的預設樣式
    if (currentPage.startsWith('/dashboard')) {
      return (
        <AuthProvider>
          <CouponHasProvider>
            <DefaultLayout currentPage={currentPage}>
              <DashboardLayout>{children}</DashboardLayout>
            </DefaultLayout>
          </CouponHasProvider>
        </AuthProvider>
      )
    } else {
      // 其他所有頁面的預設樣式
      return (
        <AuthProvider>
          <CouponHasProvider>
            <DefaultLayout currentPage={currentPage}>{children}</DefaultLayout>
          </CouponHasProvider>
        </AuthProvider>
      )
    }
  }

  return (
    <>
      <EventProvider>{getLayout(<Component {...pageProps} />)}</EventProvider>
    </>
  )
}
