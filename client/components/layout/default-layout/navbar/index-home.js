import { useState } from 'react'
import NavMenu from './navmenu'
import NavRwd from './navRwd'
import SideCart from './sideCart'
import styles from './index-home.module.scss'

export default function Navbar2() {
  return (
    <>
      <nav className={`${styles.navBar}`}>
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

          <h1 className="fw-bolder mb-0 text-light">DiVING</h1>
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
