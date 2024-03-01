import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Head from 'next/head'

import BsCard from '@/components/lesson/Bs-card'
import AddrCheck from '@/components/lesson/Addrcheck'
import DiffCheck from '@/components/lesson/Diffcheck'
import List from '@/components/lesson/List'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faChevronRight,
  faMinus,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'

function Test() {
  const fav = Array.from({ length: 5 })
  // const list = Array.from({ length: 5 })
  return (
    <>
      <Head>
        <title>課程總覽</title>
      </Head>
      <Container
        className="d-none d-lg-block d-md-none d-lg-block lesson"
        style={{ backgroundColor: '#f5f5f5', paddingTop: '5rem' }}
      >
        <Row className="">
          <Col lg="3">
            <div className="fs-3">課程分類</div>
            <hr />
            <div className="mb-3">
              <div className="fs-4 mb-1">商品評價</div>
              {fav.map((v, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="ps-1" />
              ))}
            </div>
            <div className="mb-3">
              <div className="fs-4">價格收尋</div>
              <div className="mb-3 d-flex">
                <input
                  type="number"
                  className="form-control"
                  id=""
                  placeholder="Low Price"
                  onChange={() => {}}
                />
                <span className="d-flex align-items-center px-1">
                  <FontAwesomeIcon icon={faMinus} />
                </span>
                <input
                  type="number"
                  className="form-control"
                  id=""
                  placeholder="High Price"
                  onChange={() => {}}
                />
                <div className="btn border align-items-center">
                  <FontAwesomeIcon icon={faChevronRight} />
                  <i className="fa-solid fa-greater-than text-center"></i>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="fs-4">地點</div>
              <AddrCheck />
            </div>
            <div className="mb-3">
              <div className="fs-4">潛點等級</div>
              <DiffCheck />
            </div>
          </Col>
          <Col lg="9" className="scrollbar-area scrollbar">
            <div
              className="d-flex justify-content-between"
              style={{ backgroundColor: '#f5f5f5' }}
            >
              <div className="fs-3">課程總覽</div>

              <div className="d-flex align-items-center">
                <div
                  className="input-group input-group-sm align-self-center me-1"
                  onChange={() => {}}
                >
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
                  <input
                    type="text"
                    className="form-control"
                    aria-label=""
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={() => {}}
                  />
                </div>
                <FontAwesomeIcon
                  className="ps-2 btn border"
                  icon={faMagnifyingGlass}
                />
              </div>
            </div>
            <List />
          </Col>
        </Row>
      </Container>
      <Container
        className="d-lg-none pb-3"
        style={{ backgroundColor: '#f5f5f5', paddingTop: '5rem' }}
      >
        <Row className="">
          <Col sm={6}>
            <BsCard></BsCard>
            <BsCard></BsCard>
          </Col>
          <Col sm={6}>
            <BsCard></BsCard>
            <BsCard></BsCard>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Test
