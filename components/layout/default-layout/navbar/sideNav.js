import Link from 'next/link'
import React from 'react'
import styles from './side-nav.module.scss'
import { menuItems } from '@/config/nav-menu'

export default function SideNav() {
  return (
    <>
      <div className={`${styles.sideNav} p-4`}>
        <div className={` ${styles.xIcon}`}>
          <i class="bi bi-x-lg text-light fs-4"></i>
        </div>
        <h2 className="fw-bolder text-light py-5">DiVING</h2>
        <ul className={`p-0`}>
          {menuItems.map((v) => {
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
            return (
              <li key={v.id} className={` mb-1 `}>
                <Link
                  href={v.href}
                  className={`py-2 d-inline-block ${styles.menuTitle}`}
                >
                  {v.label}
                </Link>
                {v.children.map((v2) => {
                  return (
                    <ul key={v2.id} className="mt-2">
                      <li>
                        <Link
                          href={v2.href}
                          className={`d-flex justify-content-between py-2 px-3 d-block ${styles.menuSub}`}
                        >
                          <p className="m-0">{v2.label}</p>
                          <i class="bi bi-chevron-right "></i>
                        </Link>
                      </li>
                    </ul>
                  )
                })}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
