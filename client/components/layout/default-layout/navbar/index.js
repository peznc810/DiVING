import { useState } from 'react'
import NavMenu from './navmenu'
import NavRwd from './navRwd'
import SideCart from './sideCart'
import styles from './index.module.scss'
import Link from 'next/link'

export default function Navbar(background) {
  return (
    <>
      <nav className={`${styles.navBar} d-flex`} style={background}>
        <div
          className={`container-fluid d-flex justify-content-between align-items-center ${styles.navWeb}`}
        >
          {/* 點擊展開側邊欄功能 */}
          <button
            className={` fs-2 ${styles.listIcon}`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBackdrop"
            aria-controls="offcanvasWithBackdrop"
          >
            <i className="bi bi-list"></i>
          </button>

          <Link href="/" className="fs-1 fw-bolder m-0 text-light">
            DiVING
          </Link>
          <div>
            <NavMenu />
          </div>
        </div>

        {/* RWD-nav*/}
        <NavRwd />
        <SideCart />
      </nav>
    </>
  )
}
