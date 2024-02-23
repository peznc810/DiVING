import React from 'react'
import styles from './index.module.scss'
import Link from 'next/link'
import Image from 'next/image'

// React icon
import { GoPerson } from 'react-icons/go'
import { RiFileList2Line } from 'react-icons/ri'
import { TbMessage } from 'react-icons/tb'
import { FaRegHeart } from 'react-icons/fa'
import { LuClipboardList } from 'react-icons/lu'
import { HiOutlineTicket } from 'react-icons/hi'
import { TbLogout2 } from 'react-icons/tb'

export default function Menu() {
  return (
    <>
      <div
        className={`col-sm-4 rounded-start text-white px-0 ${styles['menu-container']}`}
      >
        <div className="container mt-4 px-0">
          {/* 大頭照 */}
          {/* 欠：hover 的時候要可以編輯 */}
          <div className={`m-auto mb-4 d-none ${styles.avatar}`}>
            <Image
              src="/images/users/woman.jpg"
              alt="avatar"
              fill
              priority
              className="bg-white"
            />
          </div>
          {/* 顯示優惠券張數 */}
          <div className="text-center py-3 border-top border-bottom d-none">
            {/* 欠： hover的動畫 */}
            <Link href="/dashboard/coupons" className=" text-secondary">
              1
            </Link>
            <div className="">可用優惠券</div>
          </div>
          {/* 列表 */}
          <ul className="list-unstyled my-3 px-0">
            <li>
              <Link className="ps-4" href="/dashboard/profile">
                <GoPerson />
                個人資訊
              </Link>
            </li>
            <li>
              <Link className="ps-4" href="/dashboard/orders">
                <LuClipboardList />
                訂單記錄
              </Link>
            </li>
            <li className="">
              <Link className="ps-4" href="/dashboard/coupons">
                <HiOutlineTicket />
                <span className="me-3">優惠券</span>
              </Link>
            </li>
            <li>
              <Link className="ps-4" href="/dashboard/comments">
                <TbMessage />
                我的評論
              </Link>
            </li>
            <li>
              <Link className="ps-4" href="/dashboard/favorites">
                <FaRegHeart />
                我的收藏
              </Link>
            </li>
            <li>
              <Link className="ps-4" href="/dashboard/posts">
                <RiFileList2Line />
                我的文章
              </Link>
            </li>
            <li>
              <Link className="ps-4" href="/dashboard/logout">
                <TbLogout2 />
                <span className={styles.logout}>登出</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
