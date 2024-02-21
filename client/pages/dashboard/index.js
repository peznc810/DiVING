import React from 'react'
import Head from 'next/head'
import styles from './profile.module.scss'
import Link from 'next/link'
import Image from 'next/image'

// React icon
import { GoPerson } from 'react-icons/go'
import { RiFileList2Line } from 'react-icons/ri'
import { TbMessage } from 'react-icons/tb'
import { FaRegHeart } from 'react-icons/fa'
import { LuClipboardList } from 'react-icons/lu'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>個人資料</title>
      </Head>
      <main>
        <div className="container-xl my-4">
          <div
            className={`row justify-content-center m-auto ${styles['profile-container']}`}
          >
            {/* 左邊 */}
            <div
              className={`col-sm-4 rounded-start text-white ${styles['menu-container']}`}
            >
              <div className="container my-4 py-2">
                {/* 大頭照 */}
                <div className={`m-auto mb-3 ${styles.avatar}`}>
                  <Image
                    src="./images/users/woman.jpg"
                    alt="avatar"
                    fill
                    priority
                    className="bg-white"
                  />
                </div>
                {/* 顯示優惠券張數 */}
                <div className="show-coupon text-center py-3 border-top border-bottom ">
                  <div className=" text-secondary">1</div>
                  <div className="">可用優惠券</div>
                </div>
                {/* 列表 */}
                <ul className="list-unstyled py-3">
                  <li>
                    <Link className="text-center" href="/dashboard/profile">
                      <GoPerson />
                      個人資訊
                    </Link>
                  </li>
                  <li>
                    <Link className="text-center" href="/dashboard/orders">
                      <LuClipboardList />
                      訂單記錄
                    </Link>
                  </li>
                  <li className="">
                    <Link className="text-center" href="/dashboard/coupons">
                      <LuClipboardList />
                      優惠券
                    </Link>
                  </li>
                  <li>
                    <Link className="text-center" href="/dashboard/comments">
                      <TbMessage />
                      我的評論
                    </Link>
                  </li>
                  <li>
                    <Link className="text-center" href="/dashboard/favorites">
                      <FaRegHeart />
                      我的收藏
                    </Link>
                  </li>
                  <li>
                    <Link className="text-center" href="/dashboard/posts">
                      <RiFileList2Line />
                      我的文章
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* 右邊 */}
            <div
              className={`col-sm-8 border border-1 border-primary rounded-end ${styles['form-container']}`}
            ></div>
          </div>
        </div>
      </main>
    </>
  )
}
