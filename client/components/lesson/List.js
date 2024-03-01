import React from 'react'
import Image from 'react-bootstrap/Image'
import Link from 'next/link'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

import LessonData from '@/data/lesson/lesson'

export default function List() {
  let lessons = LessonData
  console.log(lessons)
  return (
    <>
      {lessons.map((lesson, index) => (
        <Row key={index} className="m-2 g-0 shadow-sm rounded bg-white">
          <Col lg={4}>
            <div className="lesson_img">
              <Image
                className="img-fluid rounded-start"
                src="https://images.pexels.com/photos/19733182/pexels-photo-19733182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
          </Col>
          <Col lg={8} className="p-3">
            <Row className="">
              <Col lg={9} className="fs-4" style={{ height: '2rem' }}>
                <div className="d-flex align-items-center">{lesson.title}</div>
              </Col>
              <Col lg={3} className="text-end">
                <div className="fs-5">
                  <FontAwesomeIcon className="pe-1" icon={faLocationDot} />
                  {lesson.location}
                </div>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={12} className="px-3" style={{ height: '4rem' }}>
                {lesson.content}
              </Col>
              <Col lg={12} className="text-end">
                <Link className="" href="/">
                  閱讀更多..
                </Link>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={3}>
                <div className="rounded-pill border border-primary-subtle text-center">
                  {lesson.tag}
                </div>
              </Col>
              <Col className="text-end">
                <div className="text-danger">NT$ {lesson.price.price}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </>
  )
}
