import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import styles from '@/components/dashboard/styles.module.scss'

import { Form, InputGroup, Stack, Container } from 'react-bootstrap'
import DiButton from '@/components/post/diButton'
import QuillEditor from '@/components/post/quill'
import ImageUpload from '@/components/post/imageUpload'
import TagGenerator from '@/components/post/tagGenerator'
import { useRouter } from 'next/router'

export default function Edit() {
  const router = useRouter()
  const [editorLoaded, setEditorLoaded] = useState(false)

  const [editFormData, setEditFormData] = useState({
    user_id: '',
    title: '',
    image: '',
    content: '',
    tags: '',
  })

  const [isLoading, setIsLoading] = useState(true)
  const fetchPostData = async (pid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/post/${pid}`)
      const data = await res.json()

      if (data.title) {
        setEditFormData({
          user_id: data.user_id,
          title: data.title || '',
          image: data.image,
          content: data.content,
          tags: data.tags,
        })

        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Error fetching article data:', error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      // 如果isReady是true 確保能得到 query的值
      const { pid } = router.query
      // 不這樣的話 會有不是pid的情況 會有要不到資料的情況 會變有多餘的請求
      console.log(pid)
      fetchPostData(pid)
    }
  }, [router.isReady]) // 確保只在 component 首次渲染時執行

  const handleFormDataChange = (fieldName) => (e) => {
    const newData = e.target.value
    setEditFormData({ ...editFormData, [fieldName]: newData })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting data:', editFormData)

    // 在這裡發送POST請求到後端保存數據
    try {
      const response = await fetch('http://localhost:3005/api/post/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
        // body: JSON.stringify(postData),
      })

      // 處理後端返回的響應
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.error('Error submitting data:', error)
    }
  }

  return (
    <>
      <Head>
        <title>編輯文章</title>
      </Head>
      <Menu />
      <div className={`col-sm-8 p-0 rounded-end ${styles['form-container']}`}>
        <div className="container my-4">
          <div className="accordion">
            <div className="accordion-header">
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">編輯文章</h2>
            </div>
            <div className="accordion-body overflow-auto">
              <Form className="my-3" onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    文章標題
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="title"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={handleFormDataChange('title')}
                    value={editFormData.title} // 設定預設值
                  />
                </InputGroup>
                <ImageUpload />
                <TagGenerator
                  onChange={handleFormDataChange('tags')}
                  value={editFormData.tags}
                />
                <br />
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <QuillEditor
                    // value={editedContent || content}
                    onChange={(data) => {
                      setEditFormData(data)
                    }}
                    className="w-full h-[70%] mt-10 bg-white"
                    editorLoaded={editorLoaded}
                    initialContent={editFormData.content}
                  />{' '}
                </Form.Group>
                <Stack direction="horizontal" gap={3}>
                  <div className="p-2 mx-auto">
                    <DiButton text={'取消'} color={'#dc5151'} />
                    <DiButton
                      type={'submit'}
                      text={'送出'}
                      color={'#013c64'}
                    />{' '}
                  </div>
                </Stack>
              </Form>
              <div>
                <input type="text" value={editFormData.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
