import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles.module.scss'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
// React icon
import { FaTrashCan } from 'react-icons/fa6'
import { MdOutlineLibraryAdd } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'

import usePagination from '@/hooks/use-pagination'
import Pagination from '../pagination'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import CancelAlert from '@/components/post/cancelAlert'
import { Stack } from 'react-bootstrap'

export default function Index() {
  const [postList, setPostList] = useState([])
  // 控制分頁
  const { currentPage, pageItem, handlePage, getPageNumbers } = usePagination(
    postList,
    10
  )
  const { auth } = useAuth()
  const router = useRouter()
  // const token = localStorage.getItem('token')
  const prevAuthId = useRef(auth.id) //防止相同id一直重複被查詢

  const getPost = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/post/posts/router?userId=${userId}`
      )
      const data = await res.json()

      if (Array.isArray(data)) {
        setPostList(data)
      }
    } catch (e) {
      console.error('Error fetching data from the server:', e)
    }
  }

  useEffect(() => {
    if (auth.id !== '') {
      getPost(auth.id)
      console.log(auth.id)
    }
  }, [auth])

  const handleDisablePost = async (e, postId) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/post/disable/${postId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
            // 可以添加其他必要的Header，如授權令牌等
          },
        }
      )
      //成功的話跳alert
      if (res.status === 200) {
        Swal.fire({
          title: '刪除成功',
          showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
          },
          hideClass: {
            popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
          },
          backdrop: `
        rgba(0,0,123,0.4)
        url("/images/post/swimmingdog.gif")
        top
        no-repeat
      `,
        })
        //跳轉
        router.push('/dashboard/posts')
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
                  {pageItem.map((v, i) => (
                    <tr className="align-middle" key={v.id + i}>
                      {/* map()加上i 避免跟user_id的id重複 */}
                      <td>{i + 1}</td>
                      <td>
                        <Link
                          href={`/post/${v.id}`}
                          className={`text-black ${styles['text-hover']}`}
                          target="_blank"
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
                          onClick={() => handleDisablePost(v.id)}
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
