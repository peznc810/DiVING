import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Container,
  Col,
  Row,
  InputGroup,
  Button,
  Form,
  Carousel,
  Image,
} from 'react-bootstrap'
import styles from '@/components/post/post-list.module.scss'
import LoaderPing from '@/components/post/loaderPing'
import PostCard from '@/components/post/postCard'

export default function List() {
  const [postList, setPostList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const desiredIndexes = [4, 6, 8] // 指定要顯示在輪播的的三個index

  const getPost = async () => {
    try {
      const params = {
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
  }, [searchText]) // searchText 變化時重新取得數據

  const loader = <LoaderPing />

  const handleTagClick = async (tag) => {
    try {
      const res = await fetch(`http://localhost:3005/api/post/${tag}`)
      const data = await res.json()
      setPostList(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data from the server:', error)
    }
  }

  return (
    <>
      <Container className="mt-3">
        <div className="my-1">
          {' '}
          <h4>熱門文章</h4>
          <div>
            <Carousel
              interval={5000}
              fade={true}
              slide={true}
              className={styles['carousel']}
            >
              {postList.map(
                (v, index) =>
                  desiredIndexes.includes(index) && (
                    <Carousel.Item
                      key={v.id}
                      className={styles['carousel-item']}
                    >
                      <Link
                        href={`/post/${v.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Image
                          rounded
                          variant="top"
                          src={`/images/post/${v.image}`}
                          alt={v.image}
                        />
                      </Link>
                      <Carousel.Caption>
                        <h3>{v.title}</h3>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )
              )}
            </Carousel>
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

        {isLoading ? (
          loader
        ) : (
          <PostCard postList={postList} handleTagClick={handleTagClick} />
        )}
      </Container>
    </>
  )
}
