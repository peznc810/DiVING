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
import { HiOutlineTicket } from 'react-icons/hi'
import { TbLogout2 } from 'react-icons/tb'

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
                {/* hover 的時候要可以編輯 */}
                <div className={`${styles.avatar}`}>
                  <Image
                    src="./images/users/woman.jpg"
                    alt="avatar"
                    fill
                    priority
                    className="bg-white"
                  />
                </div>
                {/* 顯示優惠券張數 */}
                <div className="text-center py-3 border-top border-bottom ">
                  {/* 這裡還欠hover的動畫 */}
                  <Link href="/dashboard/coupons" className=" text-secondary">
                    1
                  </Link>
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
                      <HiOutlineTicket />
                      <span className="me-3">優惠券</span>
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
                  <li>
                    <Link className="text-center" href="/dashboard/logout">
                      <TbLogout2 />
                      <span className={styles.logout}>登出</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* 右邊 */}
            <div
              className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}
            >
              <div className="container my-4">
                <div
                  class="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="fw-medium accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        個人資料
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <form action="">
                        <div class="accordion-body">
                          <div className="row">
                            <div className="col-6">
                              <label htmlFor="myName" className="form-label">
                                姓名
                              </label>
                              <input
                                type="text"
                                id="myName"
                                className="form-control"
                              />
                            </div>
                            <div className="col-6">
                              <label htmlFor="myBirth" className="form-label">
                                生日
                              </label>
                              <input
                                type="date"
                                id="myBirth"
                                className="form-control"
                              />
                            </div>
                            <div className="col-12">
                              <label htmlFor="myEmail" className="form-label">
                                電子郵件
                              </label>
                              <input
                                type="email"
                                id="myEmail"
                                className="form-control"
                              />
                            </div>
                            <div className="col-12">
                              <label htmlFor="myTel" className="form-label">
                                電話號碼
                              </label>
                              <input
                                type="tel"
                                id="myTel"
                                className="form-control"
                              />
                            </div>
                            <div className="col-3">
                              <label htmlFor="postcode" className="form-label">
                                郵遞區號
                              </label>
                              <input
                                type="text"
                                id="postcode"
                                className="form-control"
                              />
                            </div>
                            <div className="col-9">聯絡地址</div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="fw-medium accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        密碼管理
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <form action="">
                        <div class="accordion-body">
                          Placeholder content for this accordion, which is
                          intended to demonstrate the
                          <code>.accordion-flush</code> class. This is the
                          second accordion body. imagine this being filled with
                          some actual content.
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
