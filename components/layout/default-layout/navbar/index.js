import { useState } from 'react'
import NavMenu from './navmenu'
import SideNav from './sideNav'
import styles from './index.module.scss'

export default function Navbar() {
  const [sideNav, setSideNav] = useState(false)
  return (
    <>
      <nav className={`${styles.navBar}`}>
        <div
          className={`container-fluid d-flex justify-content-between align-items-center ${styles.navWeb}`}
        >
          <button
            className={`text-light p-2 fs-2 ${styles.list}`}
            onClick={() => {
              setSideNav(!sideNav)
            }}
          >
            <i class="bi bi-list"></i>
          </button>

          <h1 className="fw-bolder mb-0 text-light">DiVING</h1>
          <div>
            <NavMenu />
          </div>
        </div>
        {/* nav-rwd */}
        <div className={`${styles.navRwd} ${sideNav ? styles.active : ''}`}>
          <SideNav />
        </div>
      </nav>
    </>
  )
}
