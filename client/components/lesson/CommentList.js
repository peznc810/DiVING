import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'react-bootstrap/Image'
import { Row, Col } from 'react-bootstrap'
import { GiRoundStar } from 'react-icons/gi'
import Style from '@/styles/lessonStyle/star.module.css'

export default function Comment({ selectData }) {
  const router = useRouter()
  const [star, setStar] = useState()
  const lesson = selectData
  const pid = selectData.id

  //取得資料庫 star內容
  const getStar = async (pid) => {
    const res = await fetch(`http://localhost:3005/api/lesson/getstar/${pid}`)
    const data = await res.json()
    const [starcomment] = data
    setStar(starcomment)
  }
  useEffect(() => {
    if (router.isReady && pid) {
      getStar(pid)
    }
  }, [router.isReady, pid])
  return (
    <>
      <Row className="mt-2">
        <Col lg={2}>
          <figure className="d-flex justify-content-center m-0 ">
            <Image
              className="img-fluid rounded-circle"
              src="https://fakeimg.pl/100x100/"
              alt=""
            />
          </figure>
        </Col>
        <Col lg={10}>
          <div>安妮亞</div>
          {Array(5)
            .fill(star.score)
            .map((v, i) => {
              return (
                <button className={Style['star-btn']} key={i}>
                  <GiRoundStar className={i < v ? Style['on'] : Style['off']} />
                </button>
              )
            })}
          <div>
            I bought it 3 weeks ago and now come back just to say “Awesome
            Product”. I really enjoy it. At vero eos et accusamus et iusto odio
            dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupt et quas molestias excepturi sint non provident.
          </div>
        </Col>
      </Row>
    </>
  )
}
