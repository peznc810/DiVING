import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './latest-news.module.scss'
import EventCard from './event-card'
import EventFilter from './event-filter'

export default function LatestNews() {
  return (
    <>
      <section className={`py-5 container`}>
        <div className={` row ${styles.latestBlock} `}>
          {/* ======== 最新消息 ======== */}
          <div className={`col-7 ${styles.list}`}>
            <div className={` border-bottom border-3 border-info `}>
              <h2 className="text-info fw-bold ps-3">LATEST NEWS</h2>
            </div>
            {/* 列表 */}
            <div className={`${styles.items}`}>
              <ul className={`px-3`}>
                <li className={`d-flex align-items-center`}>
                  <div className={`me-5 ${styles.postDay}`}>
                    <p className={`${styles.date}`}>09</p>
                    <p className={`${styles.month}`}>Mar</p>
                  </div>
                  <div>
                    <span
                      className={`${styles.tag} px-2 py-1  mb-2 d-inline-block`}
                    >
                      海洋環保
                    </span>
                    <h6 className={`m-0`}>
                      標題標題標題標題標題標題標題標題標題標題
                    </h6>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ======== 預覽 ======== */}
          <div className={`col-5 ${styles.preview}`}>
            <div className={`${styles.imgDiv} my-4`}>
              {/* <Image src={'./'} alt="" fill object-fit="cover" priority></Image> */}
            </div>
            <div className={` ${styles.content}`}>
              <div>
                <h6>標題</h6>
                <p className="mb-5">
                  內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文
                </p>
              </div>
              <div className={`d-flex flex-end`}>
                <Link href={'./'} className={`${styles.preBtn} `}>
                  view more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== 活動列表 ======== */}
      <section className={`container mb-5`}>
        <div className={` ${styles.latestBlock}`}>
          <div className={` border-bottom border-3 border-info `}>
            <h2 className="text-info fw-bold ps-3">ALL EVENTS</h2>
          </div>
        </div>
        <EventFilter />
        <div className={`p-4 d-flex flex-wrap justify-content-center`}>
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>

        {/* 分頁 */}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}
