import React from 'react'
import { Container, Row, Col, Button, Card, Stack } from 'react-bootstrap'
import aboutData from '@/data/map/about'
import mapData from '@/data/map/map'
import DiButton from '@/components/post/dibutton'
import { FaWind } from 'react-icons/fa'
import { TiWeatherCloudy } from 'react-icons/ti'
import { LuWaves } from 'react-icons/lu'
import { BsFillSunsetFill } from 'react-icons/bs'

export default function Map() {
  return (
    <>
      <Container>
        <div>
          <Row>
            <Col>
              這邊放地圖
              <hr />
              <Button>墾丁</Button>
              <Button>綠島</Button>
            </Col>
            <Col>
              <h3>地名</h3>
              <Stack direction="horizontal" gap={3}>
                <div className="p-2">
                  {' '}
                  <FaWind />
                  25
                </div>
                <div className="p-2">
                  <LuWaves />
                  123
                </div>
                <div className="p-2">
                  <TiWeatherCloudy />
                  123
                </div>
                <div className="p-2">
                  <BsFillSunsetFill />
                  123
                </div>
              </Stack>
              <div></div>
            </Col>
          </Row>
        </div>
        <div className="bg-light">
          {mapData.map((v) => {
            return (
              <>
                <DiButton key={v.id} text={v.name} />

                {/* <Button
                    key={v.id}
                    href="#"
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                  >
                    {v.name}
                  </Button> */}
              </>
            )
          })}
        </div>
        <Container fluid className="border">
          {mapData.map((v) => {
            return (
              <React.Fragment key={v.id}>
                <Stack direction="horizontal" gap={3}>
                  <div className="p-2 ms-auto">
                    {' '}
                    <Button variant="warning">相關課程</Button>{' '}
                  </div>
                </Stack>
                <Card.Img variant="top" src={`/images/map/${v.image}`} />
              </React.Fragment>
            )
          })}
        </Container>
        {/* 
        <Container fluid className="border">
          <Stack direction="horizontal" gap={3}>
            <div className="p-2 ms-auto">
              {' '}
              <Button variant="warning">相關課程</Button>{' '}
            </div>
          </Stack>
          <Card.Img variant="top" src={`/images/map/${v.image}`} />
        </Container> */}
      </Container>
    </>
  )
}
