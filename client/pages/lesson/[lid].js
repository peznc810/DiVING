import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'react-bootstrap/Image'
import { Container, Row, Col } from 'react-bootstrap'
import DetailTop from '@/components/lesson/Detail-Top'
import Style from '@/styles/lessonStyle/lesson.module.scss'
// 取得lesson data
export default function Detail() {
  const router = useRouter()
  const [lessonid, setLessonId] = useState({
    id: '',
    tag: '',
    info: '',
    title: '',
    features: '',
    price: 0,
    content: '',
    processDetail: '',
    time: '',
    LV: '',
    location: '',
    locationDetail: '',
  })
  const getlessonListId = async (lid) => {
    const res = await fetch(`http://localhost:3005/api/lesson/getlist/${lid}`)

    const data = await res.json()
    const [lessonObj] = data
    setLessonId(lessonObj)
  }

  useEffect(() => {
    if (router.isReady) {
      const { lid } = router.query
      getlessonListId(lid)
    }
  }, [router.isReady])
  return (
    <>
      <Container className={`${Style.bg_color} pt-2`}>
        <DetailTop selectData={lessonid}></DetailTop>
        <hr />
        <Row className="justify-content-end">
          <Col lg={1}>
            <div className="switch text-center">
              <input
                className="switch-checkbox"
                id="switchID1"
                type="checkbox"
                name="switch-checkbox"
              />
              <div className="switch-label" htmlFor="switchID1">
                <span
                  className="switch-txt"
                  turnOn="細節"
                  turnOff="評價"
                ></span>
                <span className="switch-Round-btn"></span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <div className="fs-4 fw-bold mb-3">報名須知</div>
            <p className="fs-5">{lessonid.content}</p>
          </Col>
          <Col lg={12}>
            <div className="fs-4 fw-bold mb-3">注意事項</div>
            <p className="fs-5">{lessonid.processDetail}</p>
          </Col>
          <Col lg={12}>
            <div className="fs-4 fw-bold mb-3">活動流程</div>
            <p className="fs-5">{lessonid.features}</p>
          </Col>
          <Col lg={12}>
            <div className="fs-4 fw-bold mb-3">上課地點</div>
            <p className="fs-5">{lessonid.locationDetail}</p>
          </Col>
        </Row>
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
      </Container>
    </>
  )
}
