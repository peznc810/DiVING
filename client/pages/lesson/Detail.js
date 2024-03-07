import React from 'react'
import Image from 'react-bootstrap/Image'
import { Container, Row, Col } from 'react-bootstrap'
import DetailTop from '@/components/lesson/Detail-Top'
import Style from '@/styles/lessonStyle/lesson.module.scss'

export default function Detail() {
  return (
    <>
      <Container className={Style.bg_color} style={{ paddingTop: '5rem' }}>
        <DetailTop></DetailTop>
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
            <p className="fs-5">報名資格：12歲以上 需健康狀況良好。</p>
            <ul>
              <li className="fs-5">費用：NTD8,500</li>
              <div className="fs-5">內容:</div>
              <li className="fs-5">自由潛水教材、教練費、場地費用</li>
              <li className="fs-5">上課期間裝備使用</li>
              <li className="fs-5">上課期間公共意外責任險</li>
            </ul>
          </Col>
          <Col lg={12}>
            <div className="fs-4 fw-bold mb-3">注意事項</div>
            <p className="fs-5">
              請攜帶泳衣及個人換洗衣物，潛水中心提供盥洗浴室及用品
              潛水活動前請勿飲酒、宿醉、熬夜、感冒都會影響潛水狀況，請保持充足睡眠
              若海況或氣候不適合潛水，我們會在活動前通知你
              如需搭乘飛機請注意單次潛水後的12小時內，重複潛水後的18小時內，禁止搭乘飛機
            </p>
          </Col>
          <Col lg={12}>
            <div className="fs-4 fw-bold mb-3">活動流程</div>
            <p className="fs-5">
              室內講解裝備使用練習及水下手勢溝通 換裝出發海邊
              平靜水域淺水區練習（水深及腰處）
              前往大海探索海底世界與可愛的海龜合照 回到店裡進行盥洗更衣
            </p>
          </Col>
          <Col lg={12}>
            <div className="fs-4 fw-bold mb-3">上課地點</div>
            <p className="fs-5">946屏東縣恆春鎮大光路 後壁湖</p>
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
