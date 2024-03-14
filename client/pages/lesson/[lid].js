import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import Test from '@/components/lesson/test'
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
  const [switchOn, setSwitchOn] = useState(false)
  const handleSwitchChange = () => {
    setSwitchOn(!switchOn)
    console.log(switchOn)
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
    console.log(switchOn)
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
            {/* <div className={`${Style['switch']} text-center`}>
              <input
                className={Style['switch-checkbox']}
                id="switchID1"
                type="checkbox"
                name="switch-checkbox"
                checked={switchOn}
                onChange={handleSwitchChange}
              />
              <div className={Style['switch-label']} htmlFor="switchID1">
                <span
                  className={Style['switch-txt']}
                  turnon="細節"
                  turnoff="評價"
                ></span>
                <span className={Style['switch-Round-btn']}></span>
              </div>
            </div> */}
            <Test></Test>
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
        {/* ----comment----- */}
        <hr />
        <Row className="justify-content-end">
          <Col lg={1}>
            {/* <div className={`${Style['switch']} text-center`}>
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
            </div> */}
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
