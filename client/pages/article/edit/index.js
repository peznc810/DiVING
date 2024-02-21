// npm install quill react-quill
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css' // Import Quill styles
import { Container, Form, InputGroup, Stack, Button } from 'react-bootstrap'

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false })

export default function Home() {
  const [content, setContent] = useState('')
  console.log(QuillEditor)

  //建立 Quill 編輯器元件 (pages/index.js)
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  }

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ]

  const handleEditorChange = (newContent) => {
    setContent(newContent)
  }

  const handleShowContent = () => {
    // 在這個例子中，按下按鈕時顯示編輯器的內容
    alert(content)
  }

  return (
    <Container className="my-3">
      <main>
        <Form>
          <Form.Label>文字編輯器 Quill Rich Text Editor</Form.Label>{' '}
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              文章標題
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          <Form.Control type="text" placeholder="新增標籤..." />
          <br />
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <div className="h-screen w-screen flex items-center flex-col">
              {' '}
              <div className="h-full w-[90vw]">
                {' '}
                <QuillEditor
                  value={content}
                  onChange={handleEditorChange}
                  modules={quillModules}
                  formats={quillFormats}
                  className="w-full h-[70%] mt-10 bg-white"
                />{' '}
              </div>{' '}
            </div>{' '}
          </Form.Group>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2 mx-auto">
              <Button onClick={handleShowContent} variant="warning">
                送出(顯示編輯器內容)
              </Button>{' '}
              <Button variant="danger">取消</Button>{' '}
            </div>
          </Stack>
        </Form>
      </main>
    </Container>
  )
}
