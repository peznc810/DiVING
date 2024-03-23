import React from 'react'
import Image from 'next/image'
import styles from './event-card.module.scss'
import Link from 'next/link'

export default function EventCard({ eventList = [] }) {
  // console.log(event)

  return (
    <>
      <div className={` ${styles.content}`}>
        <div className={`d-flex flex-wrap ${styles.cards}`}>
          {eventList.map((v) => {
            // 設定時間的格式
            const option = {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }
            const date = v.created_at.toLocaleString('en-US', option)

            return (
              <Link
                href={`/event/${v.id}`}
                className={`${styles.eventCard}`}
                key={v.id}
              >
                <div className={`${styles.imgDiv} position-relative`}>
                  <Image
                    src={v.banner}
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  ></Image>
                </div>
                <div className={`${styles.content}`}>
                  <div className={`d-flex mb-2 ${styles.tagBlock}`}>
                    <span
                      className={`${styles.tag} px-2 py-1 d-inline-block text-nowrap`}
                    >
                      {v.sort}
                    </span>
                    <span className={`${styles.date}`}>{date}</span>
                  </div>
                  <h6 className={`ps-1 ${styles.title}`}>{v.title}</h6>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
