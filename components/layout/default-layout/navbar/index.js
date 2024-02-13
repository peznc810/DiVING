import React from 'react'
import NavMenu from './navmenu'
import Link from 'next/link'
import styles from './index.module.scss'

export default function Navbar() {
  return (
    <>
      <nav
        className={`container-fluid py-2 px-4 d-flex justify-content-between align-items-center ${styles.navbar}`}
      >
        <h1 className="fw-bolder m-0 text-light">DiVING</h1>
        <div>
          <NavMenu />
        </div>
      </nav>
    </>
  )
}
