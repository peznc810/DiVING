import '@/styles/globals.scss'
import { useEffect } from 'react'
import DefaultLayout from '@/components/layout/default-layout'

export default function App({ Component, pageProps }) {
  // const getLayout = Component.getLayout || ((page) => page)

  // console.log(getLayout)
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  // return <>{getLayout(<Component {...pageProps} />)}</>

  return <>{getLayout(<Component {...pageProps} />)}</>
}
