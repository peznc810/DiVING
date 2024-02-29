import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './latest-news.module.scss'

export default function LatestNews({ eventList }) {
  // 一進頁面會預設第一項被選取
  const initialPreviewIndex = eventList[0] || null
  const [previewID, setPreviewID] = useState(initialPreviewIndex)
  const [hoverID, setHoverID] = useState(null)

  const previewHandle = (id) => {
    setHoverID(id)
    // 根據滑鼠滑進，find找到相對應的id會回傳true
    const hovered = eventList.find((event) => event.id === id)
    setPreviewID(hovered)
  }

  useEffect(() => {
    if (hoverID && previewID && hoverID !== previewID.id) {
      setPreviewID(null)
    }
  }, [hoverID, previewID])

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
              <ul className={``}>
                {eventList.slice(0, 6).map((v, i) => {
                  // 設定時間的格式
                  const option = { month: 'short' }
                  const month = new Date(v.created_at).toLocaleString(
                    'en-US',
                    option
                  )
                  // 在個位數date前面補0
                  const date = new Date(v.created_at)
                    .getDate()
                    .toString()
                    .padStart(2, '0')

                  return (
                    <li
                      key={v.id}
                      className={`d-flex align-items-center `}
                      onMouseEnter={() => {
                        previewHandle(v.id)
                      }}
                    >
                      <div className={`me-5 ${styles.postDay}`}>
                        <p className={`${styles.date}`}>{date}</p>
                        <p className={`${styles.month}`}>{month}</p>
                      </div>
                      <div>
                        <span
                          className={`${styles.tag} px-2 py-1  mb-2 d-inline-block`}
                        >
                          {v.sort}
                        </span>
                        <h6 className={`m-0`}>{v.title}</h6>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* ======== 預覽 ======== */}
          {/* 如果previewIndex等於true就渲染 */}
          {previewID && (
            <div className={`col-5 ${styles.preview}`}>
              <div className={`${styles.imgDiv} mt-5 mb-3 position-relative`}>
                <Image
                  src={previewID.banner}
                  alt=""
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                ></Image>
              </div>
              <div className={` ${styles.content}`}>
                <div>
                  <h6>{previewID.title}</h6>
                  <p className="mb-5">{previewID.content}</p>
                </div>
                <div className={`d-flex flex-end`}>
                  <Link href={'./'} className={`${styles.moreBtn} `}>
                    view more
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
