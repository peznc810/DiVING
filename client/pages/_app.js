import '@/styles/globals.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'

// 會員中心的預設樣式
import DashboardLayout from '@/components/dashboard/layout'
// 會員驗證專用provider component
import { AuthProvider } from '@/hooks/auth'
import { CartProvider } from '@/hooks/cart'

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
        <CartProvider>
          <AuthProvider>
            <DefaultLayout currentPage={currentPage}>
              <DashboardLayout>{children}</DashboardLayout>
            </DefaultLayout>
          </AuthProvider>
        </CartProvider>
      )
    } else {
      // 其他所有頁面的預設樣式
      return (
        <CartProvider>
          <AuthProvider>
            <DefaultLayout currentPage={currentPage}>{children}</DefaultLayout>
          </AuthProvider>
        </CartProvider>
      )
    }
  }

  return <>{getLayout(<Component {...pageProps} />)}</>
}
