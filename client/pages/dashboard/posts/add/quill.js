// npm install quill react-quill 應該會改用CKEditor

import React, { useState } from 'react'
import { Form, InputGroup, Stack, Button, Container } from 'react-bootstrap'
import DiButton from '@/components/post/dibutton'
import QuillEditor from '@/components/post/quill'

export default function Home() {
  const [content, setContent] = useState('')
  //   console.log(QuillEditor)
  const [editedContent, setEditedContent] = useState('') // For updating content
  const [noteList, setNoteList] = useState([]) // For storing notes

  const handleEditorChange = (newContent) => {
    setContent(newContent)
  }

  const handleCreateNote = () => {
    // 創建新筆記
    setNoteList([...noteList, content])
    // setContent('')
  }

  const handleEditNote = (index) => {
    // 編輯現有筆記
    setEditedContent(noteList[index])
  }

  const handleUpdateNote = () => {
    // 更新筆記
    const updatedNoteList = [...noteList]
    updatedNoteList[noteList.indexOf(editedContent)] = content
    setNoteList(updatedNoteList)
    setEditedContent('')
    setContent('')
  }

  const handleDeleteNote = (index) => {
    // 刪除筆記
    const updatedNoteList = [...noteList]
    updatedNoteList.splice(index, 1)
    setNoteList(updatedNoteList)
  }

  return (
    <Container>
      <Form
        className="my-3"
        name="add-post"
        action="http://localhost:3005/api/edit/quill"
        method="post"
      >
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
                value={editedContent || content}
                onChange={handleEditorChange}
                className="w-full h-[70%] mt-10 bg-white"
              />{' '}
              {JSON.stringify(content)}{' '}
            </div>{' '}
          </div>{' '}
        </Form.Group>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2 mx-auto">
            <Button onClick={handleCreateNote} variant="secondary">
              送出
            </Button>{' '}
            <DiButton text={'取消'} classname={'danger'} />
          </div>
        </Stack>
      </Form>
    </Container>
  )
}
