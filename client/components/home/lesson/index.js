import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.scss'

const lessonItem = [
  {
    id: '1',
    name: '自由潛水',
    enName: 'Free Diving',
    img: '/images/home/lesson-free.jpg',
    content: '',
  },
  {
    id: '2',
    name: '水肺潛水',
    enName: 'Scuba Diving',
    img: '/images/home/lesson-scuba.jpg',
    content: '',
  },
  {
    id: '3',
    name: '技術潛水',
    enName: 'Technical Diving',
    img: '/images/home/lesson-technical.jpg',
    content: '',
  },
  {
    id: '4',
    name: '潛水教練課程',
    enName: 'Diving Instructor',
    img: '/images/home/lesson-Instructor.jpg',
    content: '',
  },
]

export default function LessonSection() {
  return (
    <>
      <section>
        <div className={`container d-flex`}>
          <div>
            <h2>潛水課程</h2>
            <p>和各種魚兒共舞，感受無限的水下探險樂趣！</p>
            <Link href="./lesson">立即報名</Link>
          </div>
          <div className={`d-flex`}>
            {lessonItem.map((v) => {
              return (
                <div
                  key={v.id}
                  className={`${styles.lessonItem} position-relative`}
                >
                  <Link href={'#'} className={`${styles.lessonLink}`}>
                    <h5>{v.name}</h5>
                    <Image
                      src={v.img}
                      alt=""
                      fill
                      object-fit="cover"
                      priority
                    ></Image>
                    <p>{v.content}</p>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
