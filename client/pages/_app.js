import '@/styles/globals.scss'
import '@/styles/product.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'
import DashboardLayout from '@/components/dashboard'


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
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </DefaultLayout>
      )
    } else {
      // 其他所有頁面的預設樣式
      return (
        <DefaultLayout currentPage={currentPage}>
          <Component {...pageProps} />
        </DefaultLayout>
      )
    }
  }

  return <>{getLayout(<Component {...pageProps} />)}</>
}
