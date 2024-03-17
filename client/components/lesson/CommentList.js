import React from 'react'
import Image from 'react-bootstrap/Image'
import { Row, Col } from 'react-bootstrap'

export default function Comment() {
  return (
    <>
      <Row className="mt-2">
        <Col lg={2}>
          <figure className="d-flex justify-content-center m-0 ">
            <Image
              className="img-fluid rounded-circle"
              src="https://fakeimg.pl/100x100/"
              alt=""
            />
          </figure>
        </Col>
        <Col lg={10}>
          <div>安妮亞</div>
          <div>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <div>
            I bought it 3 weeks ago and now come back just to say “Awesome
            Product”. I really enjoy it. At vero eos et accusamus et iusto odio
            dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupt et quas molestias excepturi sint non provident.
          </div>
        </Col>
      </Row>
    </>
  )
}
