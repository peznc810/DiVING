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
    content: '自由潛水自由潛水自由潛水自由潛水自由潛水自由潛水自由潛水',
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
      <section className={`${styles.LessonSection}`}>
        <div className={`container-fluid ps-5 pe-0 row`}>
          <div className={`col-3 p-2 ${styles.titleBlock}`}>
            <h2 className="text-light">潛水課程</h2>
            <p className="text-light">
              和各種魚兒共舞，感受無限的水下探險樂趣！
            </p>
            <Link
              href="./lesson"
              className={`d-inline-block ${styles.lessonBtn}`}
            >
              立即報名
            </Link>
          </div>

          <div className={`d-flex col-9 p-0 ${styles.lessonScroll}`}>
            {lessonItem.map((v) => {
              return (
                <div
                  key={v.id}
                  className={`${styles.lessonItem} position-relative flex-shrink-0`}
                >
                  <Link href={'#'} className={`${styles.lessonLink} `}>
                    <div className={`${styles.info} text-center`}>
                      <h5>{v.name}</h5>
                      <p>{v.enName}</p>
                    </div>
                    <Image
                      src={v.img}
                      alt=""
                      fill
                      object-fit="cover"
                      priority
                    ></Image>
                    <div className={`${styles.divHover}`}>
                      <p>{v.content}</p>
                    </div>
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
