import React from 'react'
import Link from 'next/link'

export default function Filter() {
  return (
    <>
      {/* 品牌 */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            aria-expanded="false"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-controls="panelsStayOpen-collapseOne"
          >
            品牌
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          className="accordion-collapse collapse"
        >
          <div className="accordion-body px-1">
            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                HeleiWaho
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                OceanMax
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                MYSTIC
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                ADISI
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                AROPEC
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                PrincetonTec
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                Unidive
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                EXQUIS
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 商品類別 */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            aria-expanded="false"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-controls="panelsStayOpen-collapseOne"
          >
            商品類別
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          className="accordion-collapse collapse"
        >
          <div className="accordion-body px-1">
            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                防寒衣
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                面鏡
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                呼吸管
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                蛙鞋
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                手套&襪套
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                配件
              </Link>
            </div>

            <div className="form-check">
              <Link
                href="/product/list"
                className="form-check-label"
                htmlFor="flexCheckDefault"
                style={{ color: '#303132' }}
              >
                潛水裝備{' '}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 價格篩選 */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseThree"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseThree"
          >
            價格篩選
          </button>
        </h2>
      </div>
      <div
        id="panelsStayOpen-collapseThree"
        className="accordion-collapse collapse"
      >
        <div className="accordion-body px-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              $5,000以下
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              $5,001 - $9,999
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              $10,000
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
