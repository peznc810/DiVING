import React, { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import Ckeditor from '@/components/post/ckeditor'
import Tiptap from '@/components/post/tipTap'
import { useRouter } from 'next/router'
import loader from '@/styles/loader/loader_ripple.module.css'

export default function Form({ editor }) {
  const router = useRouter()
  const [post, setPost] = useState({
    id: '',
    author: '',
    published: '',
    image: '',
    title: '',
    content: '',
    tags: '',
  })

  const [isLoading, setIsLoading] = useState(true)
  const getPost = async (pid) => {
    try {
      // 網址改成pid 用傳入的
      const res = await fetch(`http://localhost:3005/api/post/${pid}`)

      const data = await res.json()

      if (data.title) {
        setPost(data)

        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    // 出現值我們再跟伺服器要資料
    console.log(router.query)

    if (router.isReady) {
      // 如果isReady是true 確保能得到 query的值
      const { pid } = router.query
      // 不這樣的話 會有不是pid的情況 會有要不到資料的情況 會變有多餘的請求
      console.log(pid)

      getPost(pid)
    }
  }, [router.isReady]) //Eddy說just警告

  const loader = (
    <>
      <div className={styles['lds-ripple']}>
        <div></div>
        <div></div>
        <div></div>
      </div>{' '}
    </>
  )

  return (
    <>
      {isLoading ? (
        loader
      ) : (
        <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
          <div className="container my-4">
            <div className="accordion">
              <div className="accordion-header">
                <h2 className="fw-medium fs-5 d-flex py-3 m-0">編輯文章</h2>
              </div>
              <form action="">
                <div className="accordion-body overflow-auto">
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="請輸入標題"
                  />
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="新增標籤"
                  />
                  <Ckeditor />
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="form-control"
                  ></textarea>
                  <Tiptap />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
