import { useEffect } from 'react'
import { useRouter } from 'next/router'
import HomeHeader from '@/components/home/header'
import Footer from '@/components/layout/default-layout/footer'
import News from '@/components/home/news'
import About from '@/components/home/about'
import Products from '@/components/home/products'
import LessonSection from '@/components/home/lesson'

export default function Index() {
  const router = useRouter()
  const currentPage = router.pathname
  // 改變頁面body的顏色
  useEffect(() => {
    if (currentPage === '/') document.body.style.backgroundColor = '#013c64'
  }, [currentPage])

  return (
    <>
      <HomeHeader />
      <News />
      <About />
      <Products />
      <LessonSection />
    </>
  )
}
