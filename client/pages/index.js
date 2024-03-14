import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'

import HomeHeader from '@/components/home/header'
import News from '@/components/home/news'
import Server from '@/components/home/server'
import Products from '@/components/home/products'
import LessonSection from '@/components/home/lesson'
import MapSection from '@/components/home/map'
// 因為水和化，前端後端不同步，取消ssr
import dynamic from 'next/dynamic'
const Coupon = dynamic(() => import('@/components/coupon/coupon'), {
  ssr: false,
})
import { useEvent } from '@/hooks/use-eventData'

export default function Index() {
  const router = useRouter()
  const currentPage = router.pathname
  const eventList = useEvent()

  // 改變頁面body的顏色
  useEffect(() => {
    if (currentPage === '/') {
      document.body.style.backgroundColor = '#013c64'
      document.body.style.position = 'relative'
    }
    // 如果跳轉到其他頁面背景不會改變
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [currentPage])

  return (
    <>
      <ParallaxProvider>
        <HomeHeader />
        <Server />
        <News eventList={eventList} />
        <Parallax>
          <LessonSection />
          <Products />
        </Parallax>
        <MapSection />
        <Coupon />
      </ParallaxProvider>
    </>
  )
}
