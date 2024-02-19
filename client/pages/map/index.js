import React from 'react'
import { Container, Row, Col, Button, Card, Stack } from 'react-bootstrap'

const data = [
  {
    id: '1',
    map_id: '1',
    name: '石珠',
    image: 'post.jpg',
  },
  {
    id: '2',
    map_id: '1',
    name: '山海',
    image: 'post.jpg',
  },
  {
    id: '3',
    map_id: '1',
    name: '紅柴坑',
    image: 'post.jpg',
  },
]

const map = [
  {
    id: '1',
    name: '墾丁',
    image: 'post.jpg',
  },
  {
    id: '2',
    name: '綠島',
    image: 'post.jpg',
  },
  {
    id: '3',
    name: '蘭嶼',
    image: 'post.jpg',
  },
]

export default function Map() {
  return (
    <>
      <Container>
        <Row>
          <Col>這邊放地圖</Col>
          <Col>
            <h3>地名</h3>
            <hr />
            <div>幾個svg</div>
          </Col>
        </Row>
      </Container>
      <div>
        <div className="bg-light">
          {data.map((v) => {
            return (
              <>
                <Button
                  key={v.id}
                  href="#"
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                >
                  {v.name}
                </Button>
              </>
            )
          })}
        </div>
      </div>
      <Container fluid className="border">
        <Stack direction="horizontal" gap={3}>
          <div className="p-2 ms-auto">
            {' '}
            <Button variant="warning">相關課程</Button>{' '}
          </div>
        </Stack>
        {/* <Image src="https://picsum.photos/800/600" fluid /> */}
        <Card.Img variant="top" src="https://picsum.photos/800/600" />
      </Container>
    </>
  )
}
