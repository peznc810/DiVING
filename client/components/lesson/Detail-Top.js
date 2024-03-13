import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ImgSlider from './ImgSlider'
import { Row, Col } from 'react-bootstrap'
import { FaHeart } from 'react-icons/fa'
import { GiRoundStar } from 'react-icons/gi'
import Style from '@/styles/lessonStyle/star.module.css'

export default function DetailTop({ selectData }) {
  const router = useRouter()
  const [star, setStar] = useState([])
  const lesson = selectData
  const pid = selectData.id
  console.log(pid)

  //取得資料庫 star內容
  const getStar = async (pid) => {
    const res = await fetch(`http://localhost:3005/api/lesson/getstar/${pid}`)

    const data = await res.json()
    const [starcomment] = data
    setStar(starcomment)
  }
  // 取課程 星星平均值
  const Starlist = () => {
    if (star) {
      return Array(5)
        .fill(star.score)
        .map((v, i) => {
          return (
            <button className={Style['star-btn']} key={i}>
              <GiRoundStar className={i < v ? Style['on'] : Style['off']} />
            </button>
          )
        })
    } else {
      return [
        Array(5)
          .fill(0)
          .map((v, i) => {
            return (
              <button className={Style['star-btn']} key={i}>
                <GiRoundStar className={i < v ? Style['on'] : Style['off']} />
              </button>
            )
          }),
      ]
    }
  }
  const buttonStyle = lesson.tag

  useEffect(() => {
    Starlist()
    getStar(pid)
    console.log(pid)
  }, [router.isReady, selectData])

  return (
    <>
      <Row>
        <Col lg={7}>
          <figure className="">
            <ImgSlider></ImgSlider>
            {/* <SliderTest></SliderTest> */}
          </figure>
        </Col>
        <Col lg={5}>
          <Row>
            <Col lg={12}>
              <div className="fs-4 fw-bold">課程說明</div>
              <p className="fs-5 mt-3 lh-lg" style={{ height: '10rem' }}>
                {lesson.info}
              </p>
              {}
              <div
                className={`btn border rounded-pill me-1 text-white ${
                  buttonStyle == '專業科目' ? 'bg-danger' : 'bg-success'
                } `}
                style={{ buttonStyle }}
              >
                {lesson.tag}
              </div>
              <div className="fs-5 text-danger mt-3">NT$ {lesson.price}</div>
            </Col>
            <Col lg={12}>
              <div className="d-flex justify-content-between mt-3">
                <div className="fs-4 d-flex align-items-center">
                  {/* ---引入資料庫內的 star--- */}
                  {Starlist()}
                  {/* <GiRoundStar></GiRoundStar> */}
                  {/* ---引入資料庫內的 star--- */}
                  <span className="fs-6 ps-3">評論</span>
                </div>
                <div className="align-self-center">
                  <FaHeart className="fs-4" />
                </div>
              </div>
            </Col>
            <div className="btn btn-warning mt-3" type="button">
              立即預約
            </div>
          </Row>
        </Col>
      </Row>
    </>
  )
}
