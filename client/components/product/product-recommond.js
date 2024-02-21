import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function ProductRecommend() {
  return (
    <>
      <div className="container width-1200">
        <div className="row justify-content-center mt-5">
          <div className="col-sm-12 cart-area">
            <div className="row mt-1 mb-5 gy-3">
              <div className="col-sm-3 col-12">
                <Card className="custom-card bg-bg-gray">
                  <Card.Img
                    variant="top"
                    src="/images/product/test/20/20-1.jpeg"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="h6">商品名稱 </Card.Title>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <p className="note-text">NT$800</p>
                      <Button className="color-btn" variant="light">
                        <i className="bi bi-person-heart"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-sm-3 col-12">
                <Card className="custom-card bg-bg-gray">
                  <Card.Img
                    variant="top"
                    src="/images/product/test/20/20-1.jpeg"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="h6">商品名稱 </Card.Title>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <p className="note-text">NT$800</p>
                      <Button className="color-btn" variant="light">
                        <i className="bi bi-person-heart"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-sm-3 col-12">
                <Card className="custom-card bg-bg-gray">
                  <Card.Img
                    variant="top"
                    src="/images/product/test/20/20-1.jpeg"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="h6">商品名稱 </Card.Title>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <p className="note-text">NT$800</p>
                      <Button className="color-btn" variant="light">
                        <i className="bi bi-person-heart"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-sm-3 col-12">
                <Card className="custom-card bg-bg-gray">
                  <Card.Img
                    variant="top"
                    src="/images/product/test/20/20-1.jpeg"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="h6">商品名稱 </Card.Title>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <p className="note-text">NT$800</p>
                      <Button className="color-btn" variant="light">
                        <i className="bi bi-person-heart"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style global jsx>
        {`
          .width-1200 {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0;
          }
          @media screen and (max-width: 576px) {
            .width-1200 {
              width: 380px;
            }
          }
          .note-text {
            color: var(--red, #dc5151);
          }

          .type-text {
            color: var(--gray, #858585);
            font-weight: normal;
          }
          .color-btn:hover {
            background-color: #265475;
            color: #fff;
            border: none;
          }
        `}
      </style>
    </>
  )
}
