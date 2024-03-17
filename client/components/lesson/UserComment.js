import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Star from '@/components/lesson/star'

export default function UserComment() {
  return (
    <>
      <Row>
        <Col lg={12}>
          <div className="fs-4 fw-bold mb-3">顧客評價</div>
          <Star></Star>
          <div className="mb-3">
            來為 <span>SCUBA DIVING水肺潛水</span> 做個評價
          </div>
          <div className="mb-3">
            <label htmlFor={'some value'} className="form-label">
              寫下你的評論吧~
            </label>
            <textarea className="form-control" id="" rows="3"></textarea>
          </div>
        </Col>
      </Row>
      <div className="row justify-content-center">
        <div
          className="btn col-lg-3 text-white fs-4"
          style={{ backgroundColor: '#013c64' }}
        >
          送出評論
        </div>
      </div>
    </>
  )
}
