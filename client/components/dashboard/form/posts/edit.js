import React from 'react'
import styles from '../styles.module.scss'
import Ckeditor from '@/components/post/ckeditor'
import Tiptap from '@/components/post/tipTap'

export default function Form({ editor }) {
  return (
    <>
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
    </>
  )
}
