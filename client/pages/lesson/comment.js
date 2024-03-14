import React from 'react'

import CommentList from '@/components/lesson/CommentList'
import { Container, Row, Col } from 'react-bootstrap'
import DetailTop from '@/components/lesson/Detail-Top'
import UserComment from '@/components/lesson/UserComment'
import { useAuth } from '@/hooks/auth'
import Style from '@/styles/lessonStyle/lesson.module.scss'

export default function Detail1() {
  const { auth } = useAuth()
  const getUserState = (auth) => {
    if (auth.isAuth) {
      return <UserComment />
    }
    return null // 或者返回一個適當的預設值
  }

  return (
    <>
      <DetailTop
        selectData={lessonid}
        className={`${Style['bg_color']} pt-2`}
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
              <label className={Style['switch-label']} htmlFor="switchID1">
                <span
                  className={Style['switch-txt']}
                  data-turn-on="細節"
                  data-turn-off="評價"
                />
                <span className={Style['switch-Round-btn']} />
              </label>
            </div>
          </Col>
        </Row>
        {getUserState(auth)}
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
