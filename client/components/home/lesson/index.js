import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.scss'

const lessonItem = [
  {
    id: '1',
    name: '自由潛水',
    enName: 'Free Diving',
    // video: '/video/home/freediving.mp4',
    content: '自由潛水自由潛水自由潛水自由潛水自由潛水自由潛水自由潛水',
  },
  {
    id: '2',
    name: '水肺潛水',
    enName: 'Scuba Diving',
    // video: '/video/home/scuba-diving.mp4',
    content: '',
  },
  {
    id: '3',
    name: '技術潛水',
    enName: 'Technical Diving',
    // video: '/video/home/technical-diving.mp4',
    content: '',
  },
  {
    id: '4',
    name: '潛水教練課程',
    enName: 'Diving Instructor',
    // video: '/video/home/coachdiving.mp4',
    content: '',
  },
]

export default function LessonSection() {
  return (
    <>
      <section className={`${styles.LessonSection}`}>
        <div className={`container-fluid `}>
          <div className={` ${styles.titleBlock}`}>
            <div className={` ps-4 d-flex align-items-end ${styles.title}`}>
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

            <div className={`d-flex p-0 ${styles.lessonScroll} `}>
              {lessonItem.map((v) => {
                return (
                  <div
                    key={v.id}
                    className={`flex-shrink-0 ${styles.lessonItem}`}
                  >
                    <div className={`${styles.videoDiv} `}>
                      <video
                        // ref={videoRef}
                        src={v.video}
                        // autoPlay
                        muted
                        loop
                      ></video>
                    </div>
                    <div className={`${styles.play}`}>
                      <i className="bi bi-caret-right-fill"></i>
                    </div>
                    <div className={` ${styles.info}`}>
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
