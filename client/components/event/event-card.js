import React from 'react'
import Image from 'next/image'
import styles from './event-card.module.scss'

export default function EventCard({ eventList }) {
  // console.log(event)

  return (
    <>
      {eventList.map((v) => {
        return (
          <div className={`${styles.eventCard}`} key={v.id}>
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
                <span className={`${styles.date}`}>March.09.2024</span>
              </div>
              <h6>{v.title}</h6>
            </div>
          </div>
        )
      })}
    </>
  )
}
