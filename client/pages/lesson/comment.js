import React from 'react'

import CommentList from '@/components/lesson/CommentList'
import { Container, Row, Col } from 'react-bootstrap'
import DetailTop from '@/components/lesson/Detail-Top'
import UserComment from '@/components/lesson/UserComment'
import Style from '@/styles/lessonStyle/lesson.module.scss'

export default function Detail() {
  return (
    <>
      <DetailTop
        className={Style['bg_color']}
        style={{ paddingTop: '5rem' }}
      ></DetailTop>
      <Container>
        <hr />
        <Row className="justify-content-end">
          <Col lg={1}>
            <div className={`${Style['switch']} text-center`}>
              <input
                className={`${Style['switch-checkbox']}`}
                id="switchID1"
                type="checkbox"
                name={Style['switch-checkbox']}
              />
              <div className={Style['switch-label']} htmlFor="switchID1">
                <span
                  className={Style['switch-txt']}
                  turnOn="細節"
                  turnOff="評價"
                ></span>
                <span className={Style['switch-Round-btn']}></span>
              </div>
            </div>
          </Col>
        </Row>
        <UserComment />
        <Row>
          <Col lg={2}>
            <select
              className="form-select form-select-sm"
              value={'ss'}
              onChange={() => {}}
            >
              <option value="評價高到低">評價高到低</option>
              <option value="ss">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </Col>
        </Row>
        <div className="my-3">
          <CommentList></CommentList>
          <CommentList></CommentList>
          <CommentList></CommentList>
        </div>
      </Container>
    </>
  )
}
