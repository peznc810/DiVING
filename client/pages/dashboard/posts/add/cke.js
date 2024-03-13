// npm i @ckeditor/ckeditor5-react
// npm i @ckeditor/ckeditor5-build-classic

//"@ckeditor/ckeditor5-build-classic": "^41.1.0",
//"@ckeditor/ckeditor5-react": "^6.2.0",

import { useEffect, useState } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import styles from '@/components/dashboard/form/styles.module.scss'
import CKeditor from '@/components/post/ckeditor'
import { Form, InputGroup, Stack, Container } from 'react-bootstrap'
import DiButton from '@/components/post/diButton'
import ImageUpload from '@/components/post/imageUpload'
import TagGenerator from '@/components/post/tagGenerator'
import DOMPurify from 'dompurify'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function Cke() {
  const router = useRouter()
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
      const res = await fetch('http://localhost:3005/api/post/edit/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        // body: JSON.stringify(postData),
      })

      // 處理後端返回的響應
      const result = await res.json()
      if (result) {
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
      console.log(result)
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
                  <Form.Label>文字編輯器 CKEditor</Form.Label>{' '}
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                      文章標題
                    </InputGroup.Text>
                    <Form.Control
                      name="title"
                      aria-label="title"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={handleFormDataChange('title')}
                    />
                  </InputGroup>
                  <div className="board">
                    <ImageUpload />
                  </div>
                  <TagGenerator
                    value={'value'}
                    onChange={handleFormDataChange('tags')}
                  />
                  <br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <div className="h-screen w-screen flex items-center flex-col">
                      {' '}
                      <div className="h-full w-[90vw]">
                        <CKeditor
                          onChange={(data) => {
                            const purifyData = DOMPurify.sanitize(data)
                            //  將 CKEditor 中的 HTML 內容存儲到 formData.content
                            setFormData({ ...formData, content: purifyData })
                            console.log(formData)
                          }}
                          // onChange={(data) => {
                          //   setFormData({ ...formData, content: data })
                          //   console.log(formData)
                          // }}
                          editorLoaded={editorLoaded}
                        />
                      </div>
                    </div>
                  </Form.Group>
                  <Stack direction="horizontal" gap={3}>
                    <div className="p-2 mx-auto">
                      <Link href={'/dashboard/posts'}>
                        <DiButton
                          text={'取消'}
                          color={'#dc5151'}
                          // onClick={handleCancle}
                        />
                      </Link>
                      <DiButton
                        type={'submit'}
                        text={'送出'}
                        color={'#013c64'}
                      />
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
