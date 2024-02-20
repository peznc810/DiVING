import React from 'react'
import styles from './footer.module.scss'
import Link from 'next/link'

const footerItem = [
  {
    id: '1',
    name: '關於我們',
    children: [
      { id: '11', label: '品牌故事', href: '/' },
      { id: '12', label: '媒體報導', href: '/' },
      { id: '13', label: '服務條款', href: '/' },
      { id: '14', label: '退款政策', href: '/' },
    ],
  },
  {
    id: '2',
    name: '客戶服務',
    children: [
      { id: '21', label: '會員服務', href: '/' },
      { id: '22', label: '商品配送', href: '/' },
      { id: '23', label: '退換貨服務', href: '/' },
      { id: '24', label: '常見問答', href: '/' },
      { id: '25', label: '門市資訊', href: '/' },
    ],
  },
]

export default function Footer() {
  return (
    <>
      <footer className={`${styles.footerContent} py-2`}>
        <div
          className={`container-fluid d-flex justify-content-between ${styles.footerTop}`}
        >
          <h2 className="fw-bolder m-0 text-light">DiVING</h2>
          <div className="d-flex flex-wrap">
            {footerItem.map((v) => {
              return (
                <ul key={v.id}>
                  <li>
                    <h6 className="text-light text-nowrap">{v.name}</h6>
                  </li>
                  {v.children.map((v2) => {
                    return (
                      <li key={v2.id} className="">
                        <Link href={'v2.href'} className={` ${styles.linkTxt}`}>
                          {v2.label}
                        </Link>
                        <p className={`text-light `}>{v2.content}</p>
                      </li>
                    )
                  })}
                </ul>
              )
            })}
            {/* connection */}
            <ul className={`${styles.connection}`}>
              <li>
                <h6 className="text-light text-nowrap">聯絡我們</h6>
              </li>
              <li className="mb-3 ">
                <Link href="/" className={`${styles.linkTxt}`}>
                  LINE線上客服
                </Link>
              </li>
              <li>
                <p>
                  營業時間：
                  <br />
                  週一至週日 10:00 - 20:00
                </p>
              </li>
              <li>
                <p>
                  聯絡地址：
                  <br />
                  320 桃園市中壢區新生路二段421號
                </p>
              </li>
              <li>
                <p>聯絡電話：(03) 453 - 2632</p>
              </li>
            </ul>
          </div>
        </div>
        <span></span>
        <div className={`mt-3 mb-4 ${styles.footerButton}`}>
          <ul className={`d-flex m-0 justify-content-center`}>
            <li>
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-line"></i>
              </a>
            </li>
          </ul>
          <p className={`mt-2 text-light`}>
            © 2023 Lift Media • All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  )
}
