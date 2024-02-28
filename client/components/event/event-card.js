import React from 'react'
import Image from 'next/image'
import styles from './event-card.module.scss'
import Link from 'next/link'

export default function EventCard({ eventList = '' }) {
  // console.log(event)

  return (
    <>
      {eventList.map((v) => {
        // 設定時間的格式
        const option = {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }
        const date = v.created_at.toLocaleString('en-US', option)

        return (
          <Link href={'/'} className={`${styles.eventCard}`} key={v.id}>
            <div className={`${styles.imgDiv} position-relative`}>
              <Image
                src={v.banner}
                alt=""
                fill
                object-fit="cover"
                priority
              ></Image>
            </div>
            <div className={`${styles.content} my-3 px-2`}>
              <div
                className={`d-flex justify-content-between align-items-center mb-2`}
              >
                <span className={`${styles.tag} px-2 py-1 mb-2 d-inline-block`}>
                  {v.sort}
                </span>
                <span className={`${styles.date}`}>{date}</span>
              </div>
              <h6>{v.title}</h6>
            </div>
          </Link>
        )
      })}
    </>
  )
}
