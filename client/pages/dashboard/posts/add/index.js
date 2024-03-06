import { useEffect, useState } from 'react'
import CKeditor from '@/components/post/ckeditor'
import { Form, InputGroup, Stack, Container, Badge } from 'react-bootstrap'
import DiButton from '@/components/post/dibutton'

export default function Index() {
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [data, setData] = useState('')
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  const handleAddTag = () => {
    if (newTag.trim() !== '' && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(updatedTags)
  }

  const handleSubmit = async () => {
    // 將文章數據和標籤提交到後端資料庫
    const postData = {
      title: '文章標題',
      content: data,
      tags: tags,
    }

    // 在這裡發送POST請求到後端保存數據
    try {
      const response = await fetch('YOUR_BACKEND_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
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
      <div style={{ height: '80px' }}></div>
      <Container>
        <Form
          className="my-3"
          ame="form1"
          action="http://localhost:3000"
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
          <div className="mb-3">
            {tags.map((tag) => (
              <Badge
                key={tag}
                pill
                bg="primary"
                className="mr-2"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Form.Control
            type="text"
            placeholder="新增標籤..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <DiButton text={'新增標籤'} color="#ff9720" onClick={handleAddTag} />
          <br />
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <div className="h-screen w-screen flex items-center flex-col">
              {' '}
              <div className="h-full w-[90vw]">
                <div>
                  <CKeditor
                    name="description"
                    onChange={(data) => {
                      setData(data)
                    }}
                    editorLoaded={editorLoaded}
                  />{' '}
                  {JSON.stringify(data)}{' '}
                </div>
              </div>{' '}
            </div>{' '}
          </Form.Group>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2 mx-auto">
              <DiButton text={'取消'} color={'#dc5151'} />
              <DiButton
                text={'儲存文章'}
                color={'#013c64'}
                onClick={handleSubmit}
              />
            </div>
          </Stack>
        </Form>
      </Container>
    </>
  )
}
