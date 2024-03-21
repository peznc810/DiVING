import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Container,
  Card,
  Col,
  Row,
  Stack,
  InputGroup,
  Button,
  Form,
} from 'react-bootstrap'
import Caro from '@/components/post/caro'
import TagButton from '@/components/post/tagButton'
import { PiUserCircleDuotone } from 'react-icons/pi'
import LoaderPing from '@/components/post/loaderPing'

export default function List() {
  const [postList, setPostList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('DESC')
  const [searchText, setSearchText] = useState('')

  const getTagsArray = (tagsString) => {
    // 檢查 tagsString 是否存在
    if (tagsString) {
      return tagsString.split(',')
    }
    return []
  }

  const getPost = async () => {
    try {
      const params = {
        sort: sortBy,
        searchText: searchText,
      }
      // 用URLSearchParams產生查詢字串
      const searchParams = new URLSearchParams(params)

      const res = await fetch(
        `http://localhost:3005/api/post/?${searchParams.toString()}`
      )
      const data = await res.json()

      if (Array.isArray(data)) {
        // 設定到狀態
        setPostList(data)

        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    } catch (e) {
      console.error('Error fetching data from the server:', e)
    }
  }

  useEffect(() => {
    getPost()
  }, [sortBy, searchText]) // 當sortBy 變化時重新取得數據

  const loader = <LoaderPing />

  const display = (
    <>
      <Container className="mb-3">
        <Row xs={1} md={2} lg={3} className="g-4">
          {postList.map((v) => (
            <Col key={v.id}>
              <Card>
                <Link href={`/post/${v.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ height: '200px' }}>
                    <Card.Img
                      variant="top"
                      // src={`/images/post/${v.image}`}
                      src={`http://localhost:3005/upload/${v.image}`}
                      style={{ height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </Link>
                <Card.Body className="bg-light">
                  <Card.Subtitle className="mb-2 text-primary justify-content-center">
                    {new Date(v.published_at)
                      .toLocaleDateString()
                      .replace(/\//g, '-')}{' '}
                  </Card.Subtitle>

                  <Card.Title>{v.title}</Card.Title>

                  <div
                    style={{
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      textOverflow: 'ellipsis',
                      WebkitLineClamp: 2, // 要顯示的行數
                    }}
                  >
                    {/* 轉為純文字 */}
                    {htmlToPlainText(v.content)}
                  </div>

                  <Stack direction="horizontal" gap={2} className="my-2">
                    <div>
                      {getTagsArray(v.tags).map((tag, index) => (
                        <Link key={index} href="/post/list" target="_blank">
                          <TagButton text={`# ${tag}`} color={'red'} />
                        </Link>
                      ))}
                    </div>
                  </Stack>
                  <Card.Subtitle className="mb-2 text-primary text-end">
                    <PiUserCircleDuotone /> {v.name}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )

  function htmlToPlainText(html) {
    var temp = document.createElement('div')
    temp.innerHTML = html
    return temp.textContent || temp.innerText || ''
  }

  return (
    <>
      <Container className="mt-3">
        <div className="my-1">
          {' '}
          <h4>熱門文章</h4>
          <div>
            <Caro />
          </div>
        </div>
        <hr />
        <div className="my-4">
          {' '}
          <h4>所有文章</h4>
          <Row>
            <Col xs={4} className="ms-auto">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search"
                  type="text"
                  id="searchInput"
                  className="w-50"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    const inputValue =
                      document.getElementById('searchInput').value // 取輸入的值
                    setSearchText(inputValue)
                  }}
                >
                  查詢
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </div>

        {isLoading ? loader : display}
      </Container>
      <style jsx>{``}</style>
    </>
  )
}
