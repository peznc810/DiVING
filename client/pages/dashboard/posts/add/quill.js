// npm install quill react-quill 應該會改用CKEditor

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'

import styles from '@/components/dashboard/styles.module.scss'

import { Form, InputGroup, Stack, Container } from 'react-bootstrap'
import DiButton from '@/components/post/diButton'
import QuillEditor from '@/components/post/quill'
import ImageUpload from '@/components/post/imageUpload'
import TagGenerator from '@/components/post/tagGenerator'

export default function Quill() {
  const [editorLoaded, setEditorLoaded] = useState(false)

  const [formData, setFormData] = useState({
    user_id: '有值',
    title: '123',
    image: 'post.jpg',
    content: '123',
    tags: '1,2,3',
  })

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  const handleFormDataChange = (fieldName) => (e) => {
    const newData = e.target.value
    setFormData({ ...formData, [fieldName]: newData })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting data:', formData)

    // 在這裡發送POST請求到後端保存數據
    try {
      const response = await fetch(
        'http://localhost:3005/api/post/edit/quill',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          // body: JSON.stringify(postData),
        }
      )

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
              <h2 className="fw-medium fs-5 d-flex py-3 m-0">新增文章</h2>
            </div>
            <div className="accordion-body overflow-auto">
              <Container>
                <Form className="my-3" onSubmit={handleSubmit}>
                  <Form.Label>文字編輯器 Quill Rich Text Editor</Form.Label>{' '}
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                      文章標題
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="title"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={handleFormDataChange('title')}
                    />
                  </InputGroup>
                  <div className="board">
                    <ImageUpload />
                  </div>
                  <TagGenerator onChange={handleFormDataChange('tags')} />
                  <br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <div className="h-screen w-screen flex items-center flex-col">
                      {' '}
                      <div className="h-full w-[90vw]">
                        {' '}
                        <QuillEditor
                          // value={editedContent || content}
                          onChange={(data) => {
                            setFormData(data)
                          }}
                          className="w-full h-[70%] mt-10 bg-white"
                          editorLoaded={editorLoaded}
                        />{' '}
                      </div>{' '}
                    </div>{' '}
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
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
