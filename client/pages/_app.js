import '@/styles/globals.scss'
import { useEffect } from 'react'
import DefaultLayout from '@/components/layout/default-layout'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  return <>{getLayout(<Component {...pageProps} />)}</>
}
