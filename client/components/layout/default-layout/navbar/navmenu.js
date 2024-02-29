import { useState } from 'react'
import Link from 'next/link'
import styles from './navmenu.module.scss'
import { menuItems } from '@/config/nav-menu'
import Image from 'next/image'

export default function NavMenu() {
  // const [hover, setHover] = useState(false)
  const [openIndex, setOpeIndex] = useState(false)
  // 待調整
  const [token, setToken] = useState('')

  return (
    <>
      <ul className={`d-flex m-0 p-0 ${styles.nav} align-items-center`}>
        {/* 遍歷列出nav選單 */}
        {menuItems.map((v, i) => {
          {
            /* 判斷是否有下拉選單 */
          }
          if (!v.children) {
            return (
              <li key={v.id} className={`mx-3 ${styles.navMenu}`}>
                <Link
                  className={`py-2 ${styles.linkText}`}
                  href={v.href}
                  onMouseEnter={() => {
                    setOpeIndex(null)
                  }}
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
            <li key={v.id} className={`mx-3 ${styles.subMenu}`}>
              <Link
                href={v.href}
                className={`py-2 ${styles.linkText} ${
                  openIndex === i ? styles.linkFocus : ''
                } `}
                role="button"
                onMouseEnter={() => {
                  // setOpeIndex(null)
                  setOpeIndex(i)
                }}
              >
                {v.label}
              </Link>
              {/* 下拉選單 dropdown-menu */}

              <ul
                className={`${
                  openIndex === i ? styles.active : styles.inactive
                }`}
                onMouseEnter={() => {
                  setOpeIndex(i)
                }}
                onMouseLeave={() => {
                  setOpeIndex(false)
                }}
              >
                {v.children.map((v2) => {
                  return (
                    <li key={v2.id}>
                      <Link
                        href={v2.href}
                        className={` d-flex justify-content-between align-items-center`}
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
        <li className={`mx-3`}>
          {token ? (
            <div className={styles.avatar}>
              <Link href="/dashboard">
                <Image
                  src="/images/users/woman.jpg"
                  alt="avatar"
                  fill
                  priority
                />
              </Link>
            </div>
          ) : (
            <Link
              href="/users/login"
              className={`px-2 py-2 ${styles.login} ${styles.linkText}`}
            >
              登入 / 註冊
            </Link>
          )}
        </li>
        {/* 登入註冊icon */}
        <li>
          <Link href="/users/login" className={`p-2  ${styles.loginIcon}`}>
            <i className="bi bi-person-fill fs-3"></i>
          </Link>
        </li>
        {/* cart按鈕 */}
        <li>
          <button
            type="button"
            className={`p-2 ${styles.cart} position-relative`}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasCart"
            aria-controls="offcanvasWithBackdrop"
          >
            <i className={`bi bi-bag-fill `}></i>
            <span
              className={`${styles.cartDot} position-absolute translate-middle badge rounded-pill bg-danger`}
            >
              5
            </span>
          </button>
        </li>
      </ul>
    </>
  )
}
