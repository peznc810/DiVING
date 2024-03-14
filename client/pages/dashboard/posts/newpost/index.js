// npm install quill react-quill 應該會改用CKEditor

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import styles from '@/components/dashboard/form/styles.module.scss'
import { Form, InputGroup, Stack, Container } from 'react-bootstrap'
import DiButton from '@/components/post/diButton'
import QuillEditor from '@/components/post/quill'
import ImageUpload from '@/components/post/imageUpload'
import TagGenerator from '@/components/post/tagGenerator'
import CancelAlert from '@/components/post/cancelAlert'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function Index() {
  const router = useRouter()
  const [editorLoaded, setEditorLoaded] = useState(false)

  const [formData, setFormData] = useState({
    user_id: '有值',
    title: '123',
    image: 'post.jpg',
    content: '',
    tags: '1,2,3',
  })

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  const handleFormDataChange = (fieldName) => (value) => {
    // const newData = e.target.value
    setFormData({ ...formData, [fieldName]: value })
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting data:', formData)
    // 将标签数组转换为以逗号分隔的字符串
    // const tagsString = formData.tags.join(',')

    // 更新 formData 对象中的 tags 属性为字符串
    // const updatedFormData = { ...formData, tags: tagsString }

    // 在這裡發送POST請求到後端保存數據
    try {
      const res = await fetch('http://localhost:3005/api/post/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(formData),
      })

      // 處理後端返回的響應
      if (res.status === 201) {
        Swal.fire({
          title: '新增成功',
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
        router.push('/dashboard/posts')
      }
    } catch (error) {
      console.error('Error submitting data:', error)
    }
  }

  return (
    <>
      <Head>
        <title>新增文章</title>
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
                      onChange={(e) =>
                        handleFormDataChange('title')(e.target.value)
                      }
                    />
                  </InputGroup>
                  <div className="board">
                    <ImageUpload />
                  </div>
                  <TagGenerator
                    // onChange={(e) => {
                    //   handleFormDataChange('tags')(e)
                    //   console.log(e)
                    // }}
                    onTagsChange={(newTags) => {
                      handleFormDataChange('tags')(newTags.join(','))
                      console.log(newTags)
                    }}
                  />
                  <br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <div className="h-screen w-screen flex items-center flex-col">
                      <QuillEditor
                        // value={editedContent || content}
                        // onChange={(data) => {
                        //   setFormData(data)
                        // }}
                        editorLoaded={editorLoaded}
                        onChange={(value) =>
                          handleFormDataChange('content')(value)
                        }
                      />
                    </div>
                  </Form.Group>
                  <Stack direction="horizontal" gap={3}>
                    <div className="p-2 mx-auto">
                      <CancelAlert
                        title={'確定取消嗎？'}
                        text={'您的更改將不會保存。'}
                        icon={'warning'}
                        showCancelButton={true}
                        confirmButtonColor={'#3085d6'}
                        cancelButtonColor={'#d33'}
                        href={'/dashboard/posts'}
                      />
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
