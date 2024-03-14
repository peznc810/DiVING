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
        <div className={`container-fluid `}>
          <div className={` ${styles.titleBlock}`}>
            <div className={`ps-4 d-flex align-items-end ${styles.title}`}>
              <h3 className="me-3 mb-0 text-light">
                OUR <br /> LESSON
              </h3>
              <Link
                href={'/event'}
                className={`${styles.moreBtn} me-5 text-center`}
              >
                more
                <i className="bi bi-caret-right-fill ms-1"></i>
              </Link>
            </div>
          </div>

          <div
            className={`d-flex justify-content-center p-0 ${styles.lessonScroll}`}
          >
            {lessonItem.map((v) => {
              return (
                <div
                  key={v.id}
                  className={`${styles.lessonItem} position-relative `}
                >
                  <Link href={'#'} className={`${styles.lessonLink} `}>
                    <div className={`${styles.info} text-center`}>
                      <h5>{v.name}</h5>
                      <p className="m-0">{v.enName}</p>
                    </div>
                    <div className={`${styles.imgDiv}`}>
                      <Image
                        src={v.img}
                        alt=""
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                      ></Image>
                    </div>
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
