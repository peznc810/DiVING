// npm install quill react-quill

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import styles from '@/components/dashboard/form/styles.module.scss'
import loaderStyles from '@/styles/loader/loader_ripple.module.css'
import { Form, InputGroup, Stack, Container } from 'react-bootstrap'
import DiButton from '@/components/post/defaultButton'
import QuillEditor from '@/components/post/quill'
import ImageUpload from '@/components/post/imageUpload'
import TagGenerator from '@/components/post/tagGenerator'
import CancelAlert from '@/components/post/cancelAlert'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function Index() {
  const router = useRouter()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    user_id: '',
    title: '',
    image: 'post.jpg',
    content: '',
    tags: '',
  })

  useEffect(() => {
    setEditorLoaded(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  //formData內容 onChange隨時更新
  const handleFormDataChange = (fieldName) => (value) => {
    setFormData({ ...formData, [fieldName]: value })
    console.log(formData)
  }

  //提交數據
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting data:', formData)

    try {
      const res = await fetch('http://localhost:3005/api/post/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(formData),
      })

      //成功的話跳alert
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
        //跳轉
        router.push('/dashboard/posts')
      }
    } catch (error) {
      console.error('Error submitting data:', error)
    }
  }

  const loader = (
    <div className={loaderStyles['lds-ripple']}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )

  const display = (
    <Container>
      <Form className="my-3" onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            文章標題
          </InputGroup.Text>
          <Form.Control
            aria-label="title"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => handleFormDataChange('title')(e.target.value)}
            required
          />
        </InputGroup>
        <div className="board">
          <ImageUpload />
        </div>
        <TagGenerator
          onTagsChange={(newTags) => {
            handleFormDataChange('tags')(newTags.join(','))
            console.log(newTags)
          }}
        />
        <br />
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
          required
        >
          <div className="h-screen w-screen flex items-center flex-col">
            <QuillEditor
              editorLoaded={editorLoaded}
              onChange={(value) => handleFormDataChange('content')(value)}
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
            <DiButton type={'submit'} text={'送出'} color={'#013c64'} />{' '}
          </div>
        </Stack>
      </Form>
    </Container>
  )

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
              {isLoading ? loader : display}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
