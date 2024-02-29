import '@/styles/globals.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'
import DashboardLayout from '@/components/dashboard'

//會員驗證專用provider component
import { AuthProvider } from '@/hooks/auth'

export default function App({ Component, pageProps }) {
  // 獲取當前頁面路徑
  const router = useRouter()
  const currentPage = router.pathname

  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  const getLayout = () => {
    // 針對會員中心的預設樣式
    if (currentPage.startsWith('/dashboard')) {
      return (
        <DefaultLayout currentPage={currentPage}>
          <AuthProvider>
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          </AuthProvider>
        </DefaultLayout>
      )
    } else {
      // 其他所有頁面的預設樣式
      return (
        <DefaultLayout currentPage={currentPage}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </DefaultLayout>
      )
    }
  }

  return <>{getLayout(<Component {...pageProps} />)}</>
}
