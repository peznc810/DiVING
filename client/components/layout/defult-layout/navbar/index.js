import { useState } from 'react'
import NavMenu from './navmenu'
import NavRwd from './navRwd'
import styles from './index.module.scss'

export default function Navbar() {
  const [sideNav, setSideNav] = useState(false)
  return (
    <>
      <nav className={`${styles.navBar}`}>
        <div
          className={`container-fluid d-flex justify-content-between align-items-center ${styles.navWeb}`}
        >
          {/* 點擊展開側邊欄功能 */}
          <button
            className={`p-2 fs-2 ${styles.listIcon}`}
            type="button"
            onClick={() => {
              setSideNav(!sideNav)
            }}
          >
            <i className="bi bi-list"></i>
          </button>

          <h1 className="fw-bolder mb-0 text-light">DiVING</h1>
          <div>
            <NavMenu />
          </div>
        </div>
        {/* RWD-nav*/}
        {/* 展開後有透明黑底，高跟視窗一樣 */}
        <div className={`${styles.navRwd} ${sideNav ? styles.active : ''}`}>
          <NavRwd />
          <div className={`${styles.blackBlock}`}></div>
        </div>
      </nav>
    </>
  )
}
