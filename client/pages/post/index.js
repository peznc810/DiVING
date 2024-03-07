import { useState, useEffect } from 'react'
import Link from 'next/link'
import loaderStyles from '@/styles/loader/loader_ripple.module.css'
import { Container, Dropdown, Card, Col, Row, Stack } from 'react-bootstrap'
import Caro from '@/components/post/caro'
import DiButton from '@/components/post/dibutton'

export default function List() {
  const [postList, setPostList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getTagsArray = (tagsString) => {
    // 檢查 tagsString 是否存在
    if (tagsString) {
      return tagsString.split(',')
    }
    return []
  }

  const getPost = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/post')
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
  }, [])

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
        <Row xs={2} md={2} lg={2} className="g-4">
          {postList.map((v) => (
            <Col key={v.id}>
              <Card>
                <Link href={`/post/${v.id}`} style={{ textDecoration: 'none' }}>
                  <Card.Img variant="top" src={`/images/post/${v.image}`} />
                </Link>
                <Card.Body className="bg-light">
                  <Card.Subtitle className="mb-2 text-primary">
                    {v.user_id} ﹡ {v.published_at}
                  </Card.Subtitle>
                  <Card.Title>{v.title}</Card.Title>
                  <Card.Text className="text-truncate">{v.content}</Card.Text>
                  <Stack direction="horizontal" gap={3}>
                    <div className="p-2">
                      {getTagsArray(v.tags).map((tag, index) => (
                        <Link key={index} href="/post/list" target="_blank">
                          <DiButton text={`# ${tag}`} color={'red'} />
                        </Link>
                      ))}
                    </div>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )

  return (
    <>
      <Container className=" text-end">
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
          <Row className="align-items-center">
            <Col className="text-end">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  排序依據
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    發布日期 - 新到舊
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    發布日期 - 舊到新
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">???</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <input placeholder="Search" type="text" name="" id="" />
            </Col>
          </Row>
        </div>

        {isLoading ? loader : display}
      </Container>
    </>
  )
}
