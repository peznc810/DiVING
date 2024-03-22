import React, { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import Link from 'next/link'

// React icon
import { FaTrashCan } from 'react-icons/fa6'
import { MdOutlineLibraryAdd } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'

import usePagination from '@/hooks/use-pagination'
import Pagination from '../pagination'

export default function Index() {
  const [postList, setPostList] = useState([])
  // 控制分頁
  const { currentPage, pageItem, handlePage, getPageNumbers } = usePagination(
    postList,
    3
  )

  const getPost = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/post/posts')
      const data = await res.json()

      if (Array.isArray(data)) {
        setPostList(data)
      }
    } catch (e) {
      console.error('Error fetching data from the server:', e)
    }
  }

  const handleDisablePost = async (e, postId) => {
    try {
      const res = await fetch(`/api/disable/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 可以添加其他必要的Header，如授權令牌等
        },
      })

      if (res.ok) {
        // 修改成功的處理邏輯，可以刷新頁面或更新前端狀態等
        console.log('Post disabled successfully')
      } else {
        // 修改失敗
        console.error('Failed to disable post')
      }
    } catch (error) {
      console.error('Error disabling post:', error)
    }
  }

  useEffect(() => {
    getPost()
  }, [])
  return (
    <>
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion">
            <div className="accordion-header">
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">我的文章</h2>
            </div>
            <div className="accordion-body overflow-auto">
              <table className="table mb-5">
                <thead className="fs-6">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">文章標題</th>
                    <th scope="col">發佈日期</th>
                    <th scope="col">
                      <Link
                        href="/dashboard/posts/newpost"
                        className="text-black"
                      >
                        <MdOutlineLibraryAdd />
                        <span className="small ms-1">新增</span>
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* 之後改用map */}
                  {pageItem.map((v, i) => (
                    <tr className="align-middle" key={v.id}>
                      <td>{i + 1}</td>
                      <td>
                        <Link
                          href={`/post/${v.id}`}
                          className={`text-black ${styles['text-hover']}`}
                        >
                          {v.title}
                        </Link>
                      </td>
                      <td>
                        {new Date(v.published_at)
                          .toLocaleDateString()
                          .toString()
                          .replace(/\//g, '-')}
                      </td>
                      <td>
                        <Link
                          href={`/dashboard/posts/edit/${v.id}`}
                          className="btn"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          type="button"
                          className="btn"
                          value={v.id}
                          onClick={(e) => handleDisablePost(e, v.id)}
                        >
                          <FaTrashCan />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* 頁數按鈕 */}

              <Pagination
                currentPage={currentPage}
                handlePage={handlePage}
                getPageNumbers={getPageNumbers}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
