import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import Test from '@/components/lesson/test'
import GetDetail from '@/components/lesson/getDetail'
import CommentList from '@/components/lesson/CommentList'
import UserComment from '@/components/lesson/UserComment'
import DetailTop from '@/components/lesson/Detail-Top'
import Style from '@/styles/lessonStyle/lesson.module.scss'
// 取得lesson data
export default function Detail() {
  // ---確認是否登入 state---
  const { auth } = useAuth()
  const getUserState = (auth) => {
    if (auth.isAuth) {
      return <UserComment />
    }
    return null // 或者返回一個適當的預設值
  }
  const router = useRouter()
  // ---取得lessonid state---
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
  // ---使用switch---
  const [isChecked, setIsChecked] = useState(false)
  const toggleSwitch = () => {
    setIsChecked(!isChecked)
  }
  // ---連接lesson id API---
  const getlessonListId = async (lid) => {
    const res = await fetch(`http://localhost:3005/api/lesson/getlist/${lid}`)

    const data = await res.json()
    const [lessonObj] = data
    setLessonId(lessonObj)
  }
  // ---state 同步---
  useEffect(() => {
    if (router.isReady) {
      const { lid } = router.query
      getlessonListId(lid)
    }
  }, [router.isReady, isChecked])
  return (
    <>
      <Container className={`${Style.bg_color} pt-2`}>
        <DetailTop selectData={lessonid}></DetailTop>
        <hr />
        <Row className="justify-content-end">
          <Col lg={1}>
            <Test switchvalue={{ isChecked, toggleSwitch }}></Test>
          </Col>
        </Row>
        {!isChecked ? (
          <GetDetail selectData={lessonid} />
        ) : (
          <>
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
          </>
        )}

        {/* ----comment----- */}
      </Container>
    </>
  )
}
