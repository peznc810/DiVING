import { useState, useEffect } from 'react'
import Link from 'next/link'
import loaderStyles from '@/styles/loader/loader_ripple.module.css'
import {
  Container,
  Dropdown,
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
// import DOMPurify from 'dompurify'

export default function List() {
  const [postList, setPostList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('desc')
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

  const loader = (
    <div className={loaderStyles['lds-ripple']}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )

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
                      src={`/images/post/${v.image}`}
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
                  <Card.Text className="">
                    <div
                      style={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: 2, // 要顯示的行數
                      }}
                      // dangerouslySetInnerHTML={{
                      //   __html: DOMPurify.sanitize(v.content),
                      // }}
                    >
                      {htmlToPlainText(v.content)}
                    </div>
                  </Card.Text>
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
                    <PiUserCircleDuotone /> {v.user_id}
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
      <Container className="text-end">
        <div className="my-2">
          Hi UUUUUUUUUUser
          <Link className="ms-3" href={'/'}>
            我的文章
          </Link>
        </div>
      </Container>
      <Container>
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
          <Row className=" text-end">
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  排序依據
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSortBy('desc')}>
                    發布日期 - 新到舊
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('asc')}>
                    發布日期 - 舊到新
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">???</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={4}>
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
                      document.getElementById('searchInput').value // 获取输入框的值
                    setSearchText(inputValue) // 设置为搜索文本
                  }}
                >
                  送出
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
