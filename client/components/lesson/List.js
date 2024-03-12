import React, { useContext, Fragment, useState } from 'react'
import { DiffCheck } from '@/context/value'
import Image from 'react-bootstrap/Image'
import Link from 'next/link'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { FaLocationDot } from 'react-icons/fa6'
import Style from '@/styles/lessonStyle/lesson.module.scss'

import LessonData from '@/data/lesson/lesson'

export default function List() {
  let lessons = LessonData

  // 引入index state textcontent
  const { checkvalue } = useContext(DiffCheck)

  //checkbox 收尋設定
  const ArrLV = checkvalue.filter((item) => item !== false)
  //list 狀態
  const [lesson, setLesson] = useState([])
  //fav state setting
  const favState = lessons.map((v, i) => {
    return { ...v, favState: false }
  })

  const showSelectList = lessons.map((Stag) => {
    if (
      ArrLV.length === 0 ||
      ArrLV.indexOf(Stag.LV) !== -1 ||
      ArrLV.indexOf(Stag.location) !== -1
    ) {
      return (
        <Fragment key={Stag.id}>
          <Row
            className={`m-2 g-0 shadow-sm rounded bg-white ${Style['bg-hover']}`}
          >
            <Col lg={4} className={Style['hover-none']}>
              <div className="lesson_img">
                <Image
                  className="img-fluid rounded-start"
                  src="https://images.pexels.com/photos/19733182/pexels-photo-19733182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
            </Col>
            <Col lg={8} className={`p-3`}>
              <Row className={Style['hover-none']}>
                <Col lg={9} className={`fs-4`} style={{ height: '2rem' }}>
                  <div className="d-flex align-items-center">{Stag.title}</div>
                </Col>
                <Col lg={3} className={`${Style['hover-none']} text-end`}>
                  <div className="fs-5">
                    <FaLocationDot className="pe-1" />
                    {Stag.location}
                  </div>
                </Col>
              </Row>
              <Row className={`${Style['hover-none']} mt-4`}>
                <Col
                  lg={12}
                  className={`px-3 ${Style['text-area']}`}
                  style={{ height: '3rem' }}
                >
                  {Stag.content}
                </Col>
                <Col lg={12} className="text-end">
                  <Link className="" href="/">
                    閱讀更多..
                  </Link>
                </Col>
              </Row>
              <Row className={`${Style['hover-none']} mt-2`}>
                <Col lg={3}>
                  <div
                    className={`rounded-pill border border-primary-subtle text-center`}
                  >
                    {Stag.tag}
                  </div>
                </Col>
                <Col className="text-end">
                  <div className="text-danger">NT$ {Stag.price}/人含裝備</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Fragment>
      )
    }
  })
  return <>{showSelectList}</>
}
