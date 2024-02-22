import '@/styles/globals.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'

export default function App({ Component, pageProps }) {
  // 獲取當前頁面路徑
  const router = useRouter()
  const currentPage = router.pathname

  const getLayout =
    Component.getLayout ||
    ((page) => <DefaultLayout currentPage={currentPage}>{page}</DefaultLayout>)

  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  return <>{getLayout(<Component {...pageProps} />)}</>
}
