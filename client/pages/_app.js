import '@/styles/globals.scss'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  return <Component {...pageProps} />
}
