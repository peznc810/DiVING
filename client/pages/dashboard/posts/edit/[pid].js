import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Menu from '@/components/dashboard/menu'
import styles from '@/components/dashboard/form/styles.module.scss'
import loaderStyles from '@/styles/loader/loader_ripple.module.css'
import { Form, InputGroup, Stack } from 'react-bootstrap'
import DiButton from '@/components/post/defaultButton'
import QuillEditor from '@/components/post/quill'
import ImageUpload from '@/components/post/imageUpload'
import TagGenerator from '@/components/post/tagGenerator'
import { useRouter } from 'next/router'
import CancelAlert from '@/components/post/cancelAlert'
import Swal from 'sweetalert2'
import Image from 'next/image'

export default function Edit() {
  const router = useRouter()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [editFormData, setEditFormData] = useState({
    user_id: '',
    title: '',
    image: '',
    content: '',
    tags: '',
    lastUpdate: '',
  })

  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState(null)
  // 預覽圖片
  const [preview, setPreview] = useState('')
  // 當選擇檔案更動時建立預覽圖

  const fetchPostData = async (pid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/post/${pid}`)
      const data = await res.json()
      console.log('Fetched post data:', data)

      if (data.title) {
        setEditFormData({
          user_id: data.user_id,
          title: data.title,
          image: data.image,
          content: data.content,
          tags: data.tags || '',
          lastUpdate: data.updated_at,
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
      const { pid } = router.query
      fetchPostData(pid)
    }
  }, [router.isReady]) // 確保只在 component 首次渲染時執行

  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }
    // createObjectURL產生一個臨時性的URL 預覽用
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // setEditFormData({ ...editFormData, images: selectedFile })
    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const changeHandler = (e) => {
    //有檔案上傳時
    const file = e.target.files[0]
    console.log(file)
    // 表單上傳元素沒辦法完全由react可控
    if (file) {
      setSelectedFile(file)
    } else {
      setSelectedFile(null)
    }
  }

  const handleFormDataChange = (fieldName) => (value) => {
    setEditFormData({ ...editFormData, [fieldName]: value })
    console.log(editFormData)
  }

  // 提交事件
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting data:', editFormData)

    // 在這裡發送POST請求到後端保存數據
    try {
      const res = await fetch(
        `http://localhost:3005/api/post/edit/${router.query.pid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editFormData),
        }
      )

      //成功的話跳alert
      if (res.status === 201) {
        Swal.fire({
          title: '編輯成功',
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
    <>
      <Form className="my-3" onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            文章標題
          </InputGroup.Text>
          <Form.Control
            aria-label="title"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => {
              handleFormDataChange('title')(e.target.value)
            }}
            value={editFormData.title} // 設定預設值
            required
          />
        </InputGroup>
        <div className="border">
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={changeHandler}
          />
          {selectedFile && (
            <div
              style={{ width: '100%', height: '300px', position: 'relative' }}
            >
              預覽圖片:{' '}
              <Image
                src={preview}
                alt="images"
                fill={true}
                style={{ objectFit: 'contain' }}
                priority={false}
              ></Image>
            </div>
          )}
        </div>

        <div className="board">
          {editFormData.image}
          <ImageUpload />
        </div>
        <TagGenerator
          onTagsChange={(newTags) => {
            handleFormDataChange('tags')(newTags.join(','))
          }}
          initialTags={editFormData.tags}
        />
        <br />
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <div className="h-screen w-screen flex items-center flex-col">
            <QuillEditor
              editorLoaded={editorLoaded}
              onChange={(value) => handleFormDataChange('content')(value)}
              initialContent={editFormData.content}
            />{' '}
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
    </>
  )

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
              {isLoading ? loader : display}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
