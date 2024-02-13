import React from 'react'
import Link from 'next/link'
import styles from './navmenu.module.scss'

const menuItems = [
  {
    id: 1,
    label: '首頁',
    href: '/',
  },
  {
    id: 2,
    label: '活動資訊',
    href: '/active',
  },
  {
    id: 3,
    label: '所有商品',
    href: '/product',
    children: [
      { id: 31, label: '品牌1', href: '/product/brand1' },
      { id: 32, label: '品牌2', href: '/product/brand2' },
      { id: 33, label: '品牌3', href: '/product/brand3' },
    ],
  },
  {
    id: 4,
    label: '課程資訊',
    href: '/lesson',
    children: [
      { id: 41, label: '自由潛水', href: '/lesson/free-diving' },
      { id: 42, label: '水肺潛水', href: '/lesson/scuba-diving' },
      { id: 43, label: '技術潛水', href: '/lesson/technical-diving' },
      { id: 44, label: '技術教練課程', href: '/lesson/coach-lesson' },
    ],
  },
  {
    id: 5,
    label: '潛點地圖',
    href: '/map',
  },
]

export default function NavMenu() {
  return (
    <>
      <ul className="d-flex m-0">
        {/* 遍歷列出nav選單 */}
        {menuItems.map((v, i) => {
          {
            /* 判斷是否有下拉選單 */
          }
          if (!v.children) {
            return (
              <li key={v.id} className={`mx-3`}>
                <Link
                  className={` py-2 text-light ${styles.linkText}`}
                  href={v.href}
                >
                  {/* {v.label} */}
                </Link>
              </li>
            )
          }
          {
            /* 有下拉選單 */
          }
          return (
            <li key={v.id} className={`mx-3`}>
              <Link
                href={v.href}
                className={`py-2 text-light ${styles.linkText}`}
                role="button"
                data-bs-toggle="dropdown" //觸發一個下拉菜單的顯示
                aria-expanded="false" //下拉菜單（如果有的話）是關閉的
              >
                {/* {v.label} */}
              </Link>
              {/* 下拉選單 dropdown-menu */}
              <ul className={` `}>
                {v.children.map((v2) => {
                  return (
                    <li key={v.id}>
                      <Link href={v2.href} className={``}>
                        {/* {v2.label} */}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
        <li className={`me-3`}>
          <Link
            href="/login"
            className={`px-2 py-2 ${styles.login} ${styles.linkText}`}
          >
            登入/註冊
          </Link>
        </li>
        <li>
          <div>
            <i className={`bi bi-bag-fill text-light fs-5`}></i>
          </div>
        </li>
      </ul>
    </>
  )
}
