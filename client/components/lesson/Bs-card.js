import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import LessonData from '@/data/lesson/lesson'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
export default function BsCard() {
  let lessonData = LessonData
  return (
    <>
      {lessonData.map((item, i) => (
        <Card key={i} className="mx-auto mb-2" style={{ width: '18rem' }}>
          <Card.Img
            variant="top"
            src="https://images.pexels.com/photos/19733182/pexels-photo-19733182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <Card.Body>
            <Row>
              <Col>
                <Card.Title className="fs-5">{item.title}</Card.Title>
              </Col>
              <Col xs="4">
                <FontAwesomeIcon className="pe-2 fs-6" icon={faLocationDot} />
                {item.location}
              </Col>
            </Row>

            <Card.Text className="fs-6">{item.content}</Card.Text>
            <Button variant="primary">立即預約</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}
