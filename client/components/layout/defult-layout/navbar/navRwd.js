import Link from 'next/link'
import { useState } from 'react'
import styles from './navRwd.module.scss'
import { menuItems } from '@/config/nav-menu'

export default function NavRwd() {
  const [openIndex, setOpenIndex] = useState(false)
  return (
    <>
      <div className={`${styles.sideNav} p-4`}>
        <div className="d-flex justify-content-between">
          <h2 className="fw-bolder text-light py-5">DiVING</h2>
          <div className={` ${styles.xIcon}`}>
            <i className="bi bi-x-lg text-light fs-4"></i>
          </div>
        </div>
        <ul className={`p-0`}>
          {menuItems.map((v, i) => {
            if (!v.children) {
              return (
                <li key={v.id} className="mb-1">
                  <Link
                    href={v.href}
                    className={`py-2 d-inline-block ${styles.menuTitle}`}
                  >
                    {v.label}
                  </Link>
                </li>
              )
            }
            {
              /* 有下拉選單 */
            }
            return (
              <li
                key={v.id}
                className={`mb-1`}
                onMouseLeave={() => {
                  setOpenIndex(false)
                }}
              >
                <Link
                  href={v.href}
                  className={`py-2 d-inline-block ${styles.menuTitle} ${
                    openIndex === i ? styles.menuTitleFocus : ''
                  }`}
                  onMouseEnter={() => {
                    setOpenIndex(i)
                  }}
                >
                  {v.label}
                </Link>
                {/* 下拉選單 */}
                <ul
                  className={`mt-2 ${
                    openIndex === i ? styles.active : styles.inactive
                  }`}
                >
                  {v.children.map((v2) => {
                    return (
                      <li key={v2.id}>
                        <Link
                          href={v2.href}
                          className={`d-flex justify-content-between py-2 px-3 d-block ${styles.menuSub}`}
                        >
                          <p className="m-0">{v2.label}</p>
                          <i className="bi bi-chevron-right "></i>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
