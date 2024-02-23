import React from 'react'

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
      <style jsx>{`
        .container-1200 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
        }
        @media screen and (max-width: 576px) {
          .width-1200 {
            width: 380px;
          }
        }

        .mouse-add {
          margin: 10px 5px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #f5f5f57f;
          font-size: 20px;
          background-color: transparent;
          &.mouse-add:hover {
            background-color: #265475;
            color: #fff;
            border: none;
          }
        }

        #wrapper {
          overflow-x: hidden;
        }

        #sidebar-wrapper {
          min-height: 100vh;
          margin-left: -17rem;
          -webkit-transition: margin 0.25s ease-out;
          -moz-transition: margin 0.25s ease-out;
          -o-transition: margin 0.25s ease-out;
          transition: margin 0.25s ease-out;
        }

        // #sidebar-wrapper .sidebar-heading {
        //   padding: 0.875rem 1.25rem;
        //   font-size: 1.2rem;
        // }

        #sidebar-wrapper {
          width: 17rem;
        }

        #page-content-wrapper {
          min-width: 100vw;
        }

        body.sb-sidenav-toggled #wrapper #sidebar-wrapper {
          margin-left: -18rem;
        }

        @media (min-width: 768px) {
          #sidebar-wrapper {
            margin-left: 0;
          }

          #page-content-wrapper {
            min-width: 0;
            width: 100%;
          }

          body.sb-sidenav-toggled #wrapper #sidebar-wrapper {
            margin-left: -18rem;
          }
        }

        // 圓型按鈕 btn-circle
        .btn-circle.btn-xl {
          width: 70px;
          height: 70px;
          padding: 10px 16px;
          border-radius: 35px;
          font-size: 24px;
          line-height: 1.33;
        }

        .btn-circle {
          width: 30px;
          height: 30px;
          padding: 6px 0px;
          border-radius: 15px;
          text-align: center;
          font-size: 12px;
          line-height: 1.42857;
        }

        .w-350 {
          width: 100%;
        }

        .w-350 img {
          width: 100%;
        }

        .card-text {
          font-weight: 500;
          margin-bottom: 0.1rem;
        }

        .note-text {
          color: var(--red, #dc5151);
          font-size: 14.5px;
        }

        .type-text {
          color: var(--gray, #858585);
          font-weight: normal;
          font-size: 12.5px;
        }

        /* override by css variable */
        .no-border {
          --bs-border-width: 0;
        }

        /*  card-body override */
        .no-space-x {
          padding: var(--bs-card-spacer-y) 0;
        }

        .origin-p {
          margin-bottom: 0;
        }

        /* grid list */
        .toolbar {
          font-size: 16px;
          font-weight: normal;
          margin-right: 10px;
        }

        .toolbar i {
          font-size: 18px;
        }

        /* sidebar */
        div.scroll {
          width: 100%;
          height: 80vh;
          overflow-x: hidden;
          overflow-y: scroll;
          text-align: left;
          padding: 10px;
        }

        .color-f {
          font-size: 10px;
          text-align: center;
        }

        /* always show scrollbars */

        ::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 7px;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
        }

        .all-product:hover {
          background-color: #ff9720;
          color: #fff;
          border: none;
        }

        .h-now {
          font-size: 16px;
          color: #303132;
          font-weight: 400;
        }

        .f-12 {
          font-size: 16px;
          font-weight: 700;
        }

        .product-img {
          width: 520px;
          height: auto;
        }

        .product-desc {
          line-height: 30px;
          font-size: 18px;
        }

        .swiper {
          width: 100%;
          height: 300px;
          margin-left: auto;
          margin-right: auto;
        }

        .swiper-slide {
          background-size: cover;
          background-position: center;
        }

        .mySwiper2 {
          height: 80%;
          width: 100%;
        }

        .mySwiper {
          height: 20%;
          box-sizing: border-box;
          padding: 10px 0;
          margin: 10px 0;
        }

        .mySwiper .swiper-slide {
          width: 25%;
          height: 100%;
          opacity: 0.4;
        }

        .mySwiper .swiper-slide-thumb-active {
          opacity: 1;
        }

        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        h1 {
          font-size: 36px;
        }
        h2 {
          font-size: 32px;
        }
        h3 {
          font-size: 28px;
        }
        h4 {
          font-size: 24px;
        }
        h5 {
          font-size: 20px;
        }
        h6 {
          font-size: 18px;
        }
        p {
          font-size: 16px;
        }
        span {
          font-size: 16px;
        }
      `}</style>
    </>
  )
}
