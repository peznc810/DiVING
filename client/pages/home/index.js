import { useEffect } from 'react'
import HomeHeader from '@/components/home/header'
import Footer from '@/components/layout/default-layout/footer'
import News from '@/components/home/news'
import About from '@/components/home/about'
import Products from '@/components/home/products'

export default function Index() {
  // 改變頁面body的顏色
  useEffect(() => {
    document.body.style.backgroundColor = '#013c64'
  }, [])

  return (
    <>
      <HomeHeader />
      <News />
      <About />
      <Products />
      <Footer />
    </>
  )
}
