import { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import Ckeditor from '@/components/post/ckeditor'
import Tiptap from '@/components/post/tipTap'

export default function Form({ editor }) {
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [data, setData] = useState('')
  useEffect(() => {
    setEditorLoaded(true)
  }, [])
  return (
    <>
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion">
            <div className="accordion-header">
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">新增文章</h2>
            </div>
            <div className="accordion-body overflow-auto">
              {/* 從這裡加外掛 */}
              <input type="text" />
              <Tiptap />
              editor.getJSON()
              {/* --CK語法-- */}
              {/* <div>
                <Ckeditor
                  name="description"
                  onChange={(data) => {
                    setData(data)
                  }}
                  editorLoaded={editorLoaded}
                />{' '}
                {JSON.stringify(data)}{' '}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
