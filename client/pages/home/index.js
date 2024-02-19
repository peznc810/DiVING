import { useEffect } from 'react'
import Navbar2 from '@/components/layout/default-layout/navbar/index-home'
import HomeHeader from '@/components/home/header'
import Footer from '@/components/layout/default-layout/footer'
import News from '@/components/home/news'
import About from '@/components/home/about'

export default function Index() {
  // 改變頁面body的顏色
  useEffect(() => {
    document.body.style.backgroundColor = '#013c64'
    document.body.style.position = 'relative'
  }, [])

  return (
    <>
      <Navbar2 />
      <HomeHeader />
      <News />
      <About />
      <Footer />
    </>
  )
}
