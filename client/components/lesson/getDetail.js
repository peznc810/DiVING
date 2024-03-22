import React from 'react'
import Image from 'react-bootstrap/Image'
import { Row, Col } from 'react-bootstrap'

export default function getDetail({ selectData }) {
  return (
    <Row>
      <Col lg={12}>
        <div className="fs-4 fw-bold mb-3">報名須知</div>
        <p className="fs-5">{selectData.content}</p>
      </Col>
      <Col lg={12}>
        <div className="fs-4 fw-bold mb-3">注意事項</div>
        <p className="fs-5">{selectData.processDetail}</p>
      </Col>
      <Col lg={12}>
        <div className="fs-4 fw-bold mb-3">活動流程</div>
        <p className="fs-5">{selectData.features}</p>
      </Col>
      <Col lg={12}>
        <div className="fs-4 fw-bold mb-3">上課地點</div>
        <p className="fs-5">{selectData.locationDetail}</p>
      </Col>
      <figure>
        <Image
          className="img-fluid"
          src="https://fakeimg.pl/1400x340/"
          alt=""
        />
      </figure>
      <figure className="m-0 pb-2">
        <Image
          className="img-fluid"
          src="https://fakeimg.pl/1400x340/"
          alt=""
        />
      </figure>
    </Row>
  )
}
