import '@/styles/globals.scss'
import '@/styles/product.scss'
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
import { CartProvider } from '@/hooks/cart'
import { UsingCouponProvider } from '@/hooks/use-usingCoupon'

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
        <UsingCouponProvider>
          <CartProvider>
            <AuthProvider>
              <CouponHasProvider>
                <DefaultLayout currentPage={currentPage}>
                  <DashboardLayout>{children}</DashboardLayout>
                </DefaultLayout>
              </CouponHasProvider>
            </AuthProvider>
          </CartProvider>
        </UsingCouponProvider>
      )
    } else {
      // 其他所有頁面的預設樣式
      return (
        <UsingCouponProvider>
          <CartProvider>
            <AuthProvider>
              <CouponHasProvider>
                <DefaultLayout currentPage={currentPage}>
                  {children}
                </DefaultLayout>
              </CouponHasProvider>
            </AuthProvider>
          </CartProvider>
        </UsingCouponProvider>
      )
    }
  }

  return (
    <>
      <EventProvider>{getLayout(<Component {...pageProps} />)}</EventProvider>
    </>
  )
}
