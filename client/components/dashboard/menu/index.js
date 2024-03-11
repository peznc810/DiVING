import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import { menuItems } from '@/config/dashboard-menu'

// React icon
import { TbLogout2 } from 'react-icons/tb'

export default function Menu() {
  const router = useRouter()
  const path = router.pathname
  // console.log(path)
  const { logout } = useAuth()
  return (
    <>
      <div
        className={`col-sm-4 rounded-start text-white px-0 ${styles['menu-container']}`}
      >
        <div className="container mt-4 px-0">
          {/* 大頭照 */}
          {/* 欠：hover 的時候要可以編輯 */}
          <div className={`m-auto mb-4 ${styles.avatar}`}>
            <Image src="/images/users/woman.jpg" alt="avatar" fill priority />
          </div>
          {/* (先拔掉)顯示優惠券張數 */}
          {/* <div className="text-center py-3 border-top border-bottom d-none">
            <Link href="/dashboard/coupons" className=" text-secondary">
              1
            </Link>
            <div className="">可用優惠券</div>
          </div> */}
          {/* 列表 */}
          <ul className="list-unstyled my-3 px-0">
            {menuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className={`text-center text-sm-start ps-sm-4 ${
                      path.includes(item.pathname) ? 'bg-secondary' : ''
                    }`}
                    href={`/dashboard/${item.pathname}`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <Link
                className="text-center text-sm-start ps-sm-4"
                href="/"
                onClick={logout}
              >
                <TbLogout2 />
                登出
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
