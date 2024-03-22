import React, { useState } from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <>
      <div>
        <FaArrowCircleUp
          onClick={scrollToTop}
          style={{ display: visible ? 'inline' : 'none' }}
        />
      </div>
      <style jsx>{`
        div {
          position: fixed;
          width: 100%;
          left: 0;
          bottom: 400px;
          height: 20px;
          font-size: 3rem;
          z-index: 1;
          cursor: pointer;
          color: green;
        }
      `}</style>
    </>
  )
}
