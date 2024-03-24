import Link from 'next/link'
import React from 'react'
import { Container, Card, Col, Row, Stack } from 'react-bootstrap'
import TagButton from '@/components/post/tagButton'
import { PiUserCircleDuotone, PiCalendarBlankDuotone } from 'react-icons/pi'
import postStyles from './post.module.scss'

export default function PostCard({ postList }) {
  const getTagsArray = (tagsString) => {
    // 檢查 tagsString 是否存在
    if (tagsString) {
      return tagsString.split(',')
    }
    return []
  }

  // html轉為純文字
  function htmlToPlainText(html) {
    var temp = document.createElement('div')
    temp.innerHTML = html
    return temp.textContent || temp.innerText || ''
  }

  return (
    <>
      <Container className="mb-3">
        <Row xs={1} md={2} lg={3} className="g-4">
          {postList.map((v) => (
            <Col key={v.id}>
              <Card className={postStyles['card']}>
                {/* 文章詳細頁連結 設在圖片 */}
                <Link href={`/post/${v.id}`} style={{ textDecoration: 'none' }}>
                  {/* 固定圖片高度 */}
                  <div style={{ height: '200px' }}>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:3005/upload/${v.image}`}
                      style={{ height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </Link>
                <Card.Body className="bg-light">
                  <Card.Subtitle className="mb-2 text-primary">
                    <PiCalendarBlankDuotone />{' '}
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
                      // color: '#0009',
                    }}
                  >
                    {htmlToPlainText(v.content)}
                  </div>

                  <Stack direction="horizontal" gap={2} className="my-2">
                    <div>
                      {getTagsArray(v.tags).map((tag, index) => (
                        <>
                          {/* index會重複 01 012 01  */}
                          <Link
                            // key={`${v.id} + ${index}`.toString()}
                            key={index}
                            target="_blank"
                            href={`/post/tagPost/${tag}`}
                          >
                            {' '}
                            <TagButton
                              //   key={`${index}` + '#'}
                              text={`# ${tag}`}
                            />
                          </Link>

                          {/* {console.log(`${v.id} + ${index}`.toString())} */}
                        </>
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
}
