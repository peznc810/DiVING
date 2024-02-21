import '@/styles/globals.scss'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  // console.log(getLayout)
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  return <>{getLayout(<Component {...pageProps} />)}</>
}
