import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function ProductRecommend() {
  return (
    <>
      <div className="container width-1200">
        <div className="row justify-content-center mt-5 width-1200">
          <div className="col-sm-12 cart-area">
            <div className="row mt-1 mb-5 gy-3">
              <div className="col-sm-3 col-12">
                <Card className="custom-card bg-bg-gray">
                  <Card.Img
                    variant="top"
                    src="./images/cart/4-03.jpg"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '178px',
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="h6">商品名稱 </Card.Title>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      {/* <p className="text-normal-white border border-white rounded-5 py-1 px-2">
                        市集
                      </p> */}
                      <p className="note-text">NT$800</p>
                      <Button variant="light">
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
                    src="./images/cart/4-03.jpg"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '178px',
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="h6">商品名稱 </Card.Title>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      {/* <p className="text-normal-white border border-white rounded-5 py-1 px-2">
                        市集
                      </p> */}
                      <p className="note-text">NT$800</p>
                      <Button variant="light">
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
                    src="./images/cart/4-03.jpg"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '178px',
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="h6">商品名稱 </Card.Title>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      {/* <p className="text-normal-white border border-white rounded-5 py-1 px-2">
                        市集
                      </p> */}
                      <p className="note-text">NT$800</p>
                      <Button variant="light">
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
                    src="./images/cart/4-03.jpg"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '178px',
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="h6">商品名稱 </Card.Title>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      {/* <p className="text-normal-white border border-white rounded-5 py-1 px-2">
                        市集
                      </p> */}
                      <p className="note-text">NT$800</p>
                      <Button variant="light">
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
        `}
      </style>
    </>
  )
}
