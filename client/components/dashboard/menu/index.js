import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// React icon
import { GoPerson } from 'react-icons/go'
import { RiFileList2Line } from 'react-icons/ri'
import { TbMessage } from 'react-icons/tb'
import { FaRegHeart } from 'react-icons/fa'
import { LuClipboardList } from 'react-icons/lu'
import { HiOutlineTicket } from 'react-icons/hi'
import { TbLogout2 } from 'react-icons/tb'

export default function Menu() {
  const router = useRouter()
  const path = router.pathname
  // console.log(path)
  // 登出按鈕的功能
  const handleLogout = () => {
    let url = 'http://localhost:3005/api/users/logout'
    let token = localStorage.getItem('token')
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        // 把狀態中的user資料清除
        token = null
        localStorage.removeItem('token')
        console.log(result) /* 登入成功 */
      })
      .catch((err) => {
        console.log(err)
      })
  }
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
            <li>
              <Link
                className={`text-center text-sm-start ps-sm-4 ${
                  path.includes('profile') ? 'bg-secondary' : ''
                }`}
                href="/dashboard/profile"
              >
                <GoPerson />
                個人資訊
              </Link>
            </li>
            <li>
              <Link
                className={`text-center text-sm-start ps-sm-4 ${
                  path.includes('orders') ? 'bg-secondary' : ''
                }`}
                href="/dashboard/orders"
              >
                <LuClipboardList />
                訂單記錄
              </Link>
            </li>
            <li className="">
              <Link
                className={`text-center text-sm-start ps-sm-4 ${
                  path.includes('coupons') ? 'bg-secondary' : ''
                }`}
                href="/dashboard/coupons"
              >
                <HiOutlineTicket />
                優惠券
              </Link>
            </li>
            <li>
              <Link
                className={`text-center text-sm-start ps-sm-4 ${
                  path.includes('comments') ? 'bg-secondary' : ''
                }`}
                href="/dashboard/comments"
              >
                <TbMessage />
                我的評論
              </Link>
            </li>
            <li>
              <Link
                className={`text-center text-sm-start ps-sm-4 ${
                  path.includes('favorites') ? 'bg-secondary' : ''
                }`}
                href="/dashboard/favorites"
              >
                <FaRegHeart />
                我的收藏
              </Link>
            </li>
            <li>
              <Link
                className={`text-center text-sm-start ps-sm-4 ${
                  path.includes('posts') ? 'bg-secondary' : ''
                }`}
                href="/dashboard/posts"
              >
                <RiFileList2Line />
                我的文章
              </Link>
            </li>
            <li>
              <Link
                className="text-center text-sm-start ps-sm-4"
                href="/"
                onClick={handleLogout}
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
