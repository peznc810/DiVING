import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

//元件
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
import { createPortal } from 'react-dom'

export default function Index() {
  const router = useRouter()
  const currentPage = router.pathname
  const eventList = useEvent()
  const [showBottom, setShowBottom] = useState(false)

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

  // gototop
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowBottom(true)
    } else {
      setShowBottom(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const gotoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <>
      <HomeHeader />
      <Server />
      <News eventList={eventList} />
      <LessonSection />
      <Products />
      {/* <MapSection /> */}
      <Coupon />
      <div
        className={`gototop ${showBottom ? 'd-block' : 'd-none'}`}
        onClick={gotoTop}
      >
        <i className="bi bi-arrow-up-short"></i>
      </div>

      {/* style */}
      <style jsx>{`
        .gototop {
          position: fixed;
          bottom: 50px;
          right: 30px;
          width: 60px;
          height: 60px;
          background-color: #ffffffc3;
          color: #013c64;
          border-radius: 30px;
          text-align: center;
          line-height: 60px;
          cursor: pointer;
        }
        .gototop:hover,
        .gototop:hover {
          color: #ff9720;
        }
        .bi {
          font-size: 50px;
        }
      `}</style>
    </>
  )
}
