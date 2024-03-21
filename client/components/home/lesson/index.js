import React, { useState, useRef } from 'react'
import Link from 'next/link'
import styles from './index.module.scss'
import { motion } from 'framer-motion'

const lessonItem = [
  {
    id: '1',
    name: '自由潛水',
    enName: 'Free Diving',
    video: '/video/home/freediving.mp4',
    content: '自由潛水自由潛水自由潛水自由潛水自由潛水自由潛水自由潛水',
  },
  {
    id: '2',
    name: '水肺潛水',
    enName: 'Scuba Diving',
    video: '/video/home/scuba-diving.mp4',
    content: '',
  },
  {
    id: '3',
    name: '技術潛水',
    enName: 'Technical Diving',
    video: '/video/home/technical-diving.mp4',
    content: '',
  },
  {
    id: '4',
    name: '潛水教練課程',
    enName: 'Diving Instructor',
    video: '/video/home/coachdiving.mp4',
    content: '',
  },
]

export default function LessonSection() {
  const [play, setPlay] = useState({}) //使用一個物件追蹤影片播放狀態為
  const videoRef = useRef({}) // 使用一個物件來保存每個影片的 ref

  const handleMouseEnter = (id) => {
    setPlay({ ...play, [id]: true })
    if (videoRef.current[id]) {
      videoRef.current[id].play()
    }
  }

  const handleMouseLeave = (id) => {
    setPlay({ ...play, [id]: false })
    if (videoRef.current[id]) {
      videoRef.current[id].pause()
    }
  }
  return (
    <>
      <section className={`${styles.LessonSection}`}>
        <div className={`container-fluid `}>
          <div className={` ${styles.titleBlock}`}>
            <div className={` ps-4 d-flex align-items-end ${styles.title}`}>
              <motion.h3
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'tween',
                  delay: 0.5,
                  duration: 1,
                  ease: 'easeIn',
                }}
                viewport={{ once: true }}
                className="me-3 mb-0 text-light"
              >
                OUR <br /> LESSON
              </motion.h3>
              <Link href={'/'} className={`${styles.moreBtn} me-5 text-center`}>
                more
                <i className="bi bi-caret-right-fill ms-1"></i>
              </Link>
            </div>

            <div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: 'tween',
                delay: 1,
                duration: 1.5,
                ease: 'easeIn',
              }}
              viewport={{ once: true }}
              className={`d-flex p-0 ${styles.lessonScroll} `}
            >
              {lessonItem.map((v, i) => {
                return (
                  <div
                    key={v.id}
                    className={`flex-shrink-0 ${styles.lessonItem}`}
                    onMouseEnter={() => {
                      handleMouseEnter(v.id)
                    }}
                    onMouseLeave={() => {
                      handleMouseLeave(v.id)
                    }}
                  >
                    <div className={`${styles.videoDiv} `}>
                      <video
                        ref={(el) => {
                          videoRef.current[v.id] = el
                        }}
                        src={v.video}
                        autoPlay={play[v.id]}
                        muted
                        loop
                      ></video>
                      <div
                        className={`${styles.block} ${
                          play[v.id] ? 'd-none' : 'd-block'
                        }`}
                      ></div>
                    </div>
                    <div
                      className={`${styles.play} ${
                        play[v.id] ? 'd-none' : 'd-block'
                      }`}
                    >
                      <i className="bi bi-caret-right-fill"></i>
                    </div>
                    <div
                      className={` ${styles.info} ${
                        play[v.id] ? 'd-none' : 'd-block'
                      }`}
                    >
                      <div className={`${styles.enName}`}>
                        <h5 className="">{v.enName}</h5>
                      </div>
                      <div>
                        <p className="m-0">{v.name}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
