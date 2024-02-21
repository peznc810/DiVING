import { useEffect } from 'react'

import Stars from '@/components/product/star/star'
// import Pagination from 'react-bootstrap/Pagination'
import Pagination from '@/components/product/pagination'

export default function List() {
  // Toggle the side navigation
  useEffect(() => {
    // fix next issue
    if (typeof window !== 'undefined') {
      const sidebarToggle = document.body.querySelector('#sidebarToggle')

      if (sidebarToggle) {
        // 在localStorage中儲存目前sidebar情況
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
          document.body.classList.toggle('sb-sidenav-toggled')
        }

        sidebarToggle.addEventListener('click', (event) => {
          event.preventDefault()

          document.body.classList.toggle('sb-sidenav-toggled')

          localStorage.setItem(
            'sb|sidebar-toggle',
            document.body.classList.contains('sb-sidenav-toggled')
          )
        })
      }
    }
  }, [])

  return (
    <>
      <div className="container-1200">
        {/* 麵包屑 */}
        <div className="my-3 d-flex">
          <div className="d-flex align-items-center">
            <div className="p-2">
              <i class="bi bi-droplet-half p-1"></i>品牌
            </div>
            <div className="p-1">&gt;</div>
            <div className="p-2">
              <i className="bi bi-droplet p-1"></i>商品種類
            </div>
          </div>
        </div>

        <div className="row mt-2 mb-3">
          <h5 className="card-text d-flex justify-content-between align-items-center">
            <span className="ps-3">當前的分類名稱</span>
            <div className="d-flex p-2 justify-content-end align-items-center">
              <div className="toolbar">
                <button className="btn" id="sidebarToggle">
                  隱藏篩選條件 <i className="bi bi-toggles"></i>
                </button>
              </div>
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  商品排序
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      最新上架商品
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      價格：由高至低
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      價格：由低至高
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </h5>
        </div>

        <div className="row text-center">
          <div className="col-sm-12">
            <div className="d-flex" id="wrapper">
              <div className="bg-white me-3" id="sidebar-wrapper">
                <div className="scroll">
                  <div className="cats">
                    <div>
                      <button type="button" className="btn">
                        所有商品
                      </button>
                    </div>
                    <div>
                      <button type="button" className="btn">
                        促銷
                      </button>
                    </div>

                    <div
                      className="accordion accordion-flush"
                      id="accordionFlushExample"
                    >
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
                            性別
                          </button>
                        </h2>
                        <div
                          id="panelsStayOpen-collapseOne"
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
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                男性
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckChecked"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                              >
                                女性
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckChecked"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckChecked"
                              >
                                中性
                              </label>
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
                            data-bs-target="#panelsStayOpen-collapseTwo"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseTwo"
                          >
                            顏色
                          </button>
                        </h2>
                        <div
                          id="panelsStayOpen-collapseTwo"
                          className="accordion-collapse collapse"
                        >
                          <div className="accordion-body px-1">
                            <div className="d-flex flex-row justify-content-around mb-2">
                              <div className="p-2">
                                <div className="d-flex flex-column">
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-circle"
                                    ></button>
                                  </div>
                                  <div className="color-f">紫色</div>
                                </div>
                              </div>
                              <div className="p-2">
                                <div className="d-flex flex-column">
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-circle"
                                    ></button>
                                  </div>
                                  <div className="color-f">紫色</div>
                                </div>
                              </div>
                              <div className="p-2">
                                <div className="d-flex flex-column">
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-circle"
                                    ></button>
                                  </div>
                                  <div className="color-f">紫色</div>
                                </div>
                              </div>
                            </div>

                            <div className="d-flex flex-row justify-content-around mb-2">
                              <div className="p-2">
                                <div className="d-flex flex-column">
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-circle"
                                    ></button>
                                  </div>
                                  <div className="color-f">紫色</div>
                                </div>
                              </div>
                              <div className="p-2">
                                <div className="d-flex flex-column">
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-circle"
                                    ></button>
                                  </div>
                                  <div className="color-f">紫色</div>
                                </div>
                              </div>
                              <div className="p-2">
                                <div className="d-flex flex-column">
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-circle"
                                    ></button>
                                  </div>
                                  <div className="color-f">紫色</div>
                                </div>
                              </div>
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
                            data-bs-target="#panelsStayOpen-collapseThree"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseThree"
                          >
                            價格範圍
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
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              $1,500以下
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckChecked"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckChecked"
                            >
                              $1,500 - $3,000
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckChecked"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckChecked"
                            >
                              $3,001 - $5,999
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 卡片 */}
              <div id="page-content-wrapper">
                <div className="container-fluid">
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                      <div className="card w-350 border-radius f-16">
                        <img
                          src="/images/product/list/1-1.webp"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body no-space-x">
                          <Stars />
                          {/* <p className="card-text text-primary">新品上市</p> */}
                          <p className="card-text">Helei Wahoo</p>
                          <p className="card-text type-text h-now">
                            男士防寒衣
                          </p>
                          <span className="h-currency bold note-text">
                            NT$24,000
                          </span>
                          <br />
                          <p className="h-currency bold  text-decoration-line-through type-text">
                            NT$28,000
                          </p>
                          <div className="bi-icon">
                            <i className="bi bi-person-heart"></i>
                            <i className="bi bi-cart-plus-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card w-350 border-radius f-16">
                        <img
                          src="/images/product/list/1-1.webp"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body no-space-x">
                          <Stars />
                          {/* <p className="card-text text-primary">新品上市</p> */}
                          <p className="card-text">Helei Wahoo</p>
                          <p className="card-text type-text">男士防寒衣</p>
                          <span className="h-currency bold note-text">
                            NT$24,000
                          </span>
                          <br />
                          <p className="h-currency  bold h-now text-decoration-line-through">
                            NT$28,000
                          </p>
                          <div className="bi-icon">
                            {/* <i className="bi bi-suit-heart"></i> */}
                            <i className="bi bi-person-heart"></i>
                            {/* <i className="bi bi-bookmark-heart"></i> */}
                            {/* <i className="bi bi-cart4"></i> */}
                            <i className="bi bi-cart-plus-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card w-350 border-radius f-16">
                        <img
                          src="/images/product/list/1-1.webp"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body no-space-x">
                          <Stars />
                          {/* <p className="card-text text-primary">新品上市</p> */}
                          <p className="card-text">Helei Wahoo</p>
                          <p className="card-text type-text">男士防寒衣</p>
                          <span className="h-currency bold note-text">
                            NT$24,000
                          </span>
                          <br />
                          <p className="h-currency  bold h-now text-decoration-line-through">
                            NT$28,000
                          </p>
                          <div className="bi-icon">
                            {/* <i className="bi bi-suit-heart"></i> */}
                            <i className="bi bi-person-heart"></i>
                            {/* <i className="bi bi-bookmark-heart"></i> */}
                            {/* <i className="bi bi-cart4"></i> */}
                            <i className="bi bi-cart-plus-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card w-350 border-radius f-16">
                        <img
                          src="/images/product/list/1-1.webp"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body no-space-x">
                          <Stars />
                          {/* <p className="card-text text-primary">新品上市</p> */}
                          <p className="card-text">Helei Wahoo</p>
                          <p className="card-text type-text">男士防寒衣</p>
                          <span className="h-currency bold note-text">
                            NT$24,000
                          </span>
                          <br />
                          <p className="h-currency  bold h-now text-decoration-line-through">
                            NT$28,000
                          </p>
                          <div className="bi-icon">
                            {/* <i className="bi bi-suit-heart"></i> */}
                            <i className="bi bi-person-heart"></i>
                            {/* <i className="bi bi-bookmark-heart"></i> */}
                            {/* <i className="bi bi-cart4"></i> */}
                            <i className="bi bi-cart-plus-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card w-350 border-radius f-16">
                        <img
                          src="/images/product/list/1-1.webp"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body no-space-x">
                          <Stars />
                          {/* <p className="card-text text-primary">新品上市</p> */}
                          <p className="card-text">Helei Wahoo</p>
                          <p className="card-text type-text">男士防寒衣</p>
                          <span className="h-currency bold note-text">
                            NT$24,000
                          </span>
                          <br />
                          <p className="h-currency  bold h-now text-decoration-line-through">
                            NT$28,000
                          </p>
                          <div className="bi-icon">
                            {/* <i className="bi bi-suit-heart"></i> */}
                            <i className="bi bi-person-heart"></i>
                            {/* <i className="bi bi-bookmark-heart"></i> */}
                            {/* <i className="bi bi-cart4"></i> */}
                            <i className="bi bi-cart-plus-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card w-350 border-radius f-16">
                        <img
                          src="/images/product/list/1-1.webp"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body no-space-x">
                          <Stars />
                          {/* <p className="card-text text-primary">新品上市</p> */}
                          <p className="card-text">Helei Wahoo</p>
                          <p className="card-text type-text">男士防寒衣</p>
                          <span className="h-currency bold note-text">
                            NT$24,000
                          </span>
                          <br />
                          <p className="h-currency  bold h-now text-decoration-line-through">
                            NT$28,000
                          </p>
                          <div className="bi-icon">
                            {/* <i className="bi bi-suit-heart"></i> */}
                            <i className="bi bi-person-heart"></i>
                            {/* <i className="bi bi-bookmark-heart"></i> */}
                            {/* <i className="bi bi-cart4"></i> */}
                            <i className="bi bi-cart-plus-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card w-350 border-radius f-16">
                        <img
                          src="/images/product/list/1-1.webp"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body no-space-x">
                          <Stars />
                          {/* <p className="card-text text-primary">新品上市</p> */}
                          <p className="card-text">Helei Wahoo</p>
                          <p className="card-text type-text">男士防寒衣</p>
                          <span className="h-currency bold note-text">
                            NT$24,000
                          </span>
                          <br />
                          <p className="h-currency  bold h-now text-decoration-line-through">
                            NT$28,000
                          </p>
                          <div className="bi-icon">
                            {/* <i className="bi bi-suit-heart"></i> */}
                            <i className="bi bi-person-heart"></i>
                            {/* <i className="bi bi-bookmark-heart"></i> */}
                            {/* <i className="bi bi-cart4"></i> */}
                            <i className="bi bi-cart-plus-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card w-350 border-radius f-16">
                        <img
                          src="/images/product/list/1-1.webp"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body no-space-x">
                          <Stars />
                          {/* <p className="card-text text-primary">新品上市</p> */}
                          <p className="card-text">Helei Wahoo</p>
                          <p className="card-text type-text">男士防寒衣</p>
                          <span className="h-currency bold note-text">
                            NT$24,000
                          </span>
                          <br />
                          <p className="h-currency  bold h-now text-decoration-line-through">
                            NT$28,000
                          </p>
                          <div className="bi-icon">
                            {/* <i className="bi bi-suit-heart"></i> */}
                            <i className="bi bi-person-heart"></i>
                            {/* <i className="bi bi-bookmark-heart"></i> */}
                            {/* <i className="bi bi-cart4"></i> */}
                            <i className="bi bi-cart-plus-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card w-350 border-radius f-16">
                        <img
                          src="/images/product/list/1-1.webp"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body no-space-x">
                          <Stars />
                          {/* <p className="card-text text-primary">新品上市</p> */}
                          <p className="card-text">Helei Wahoo</p>
                          <p className="card-text type-text">男士防寒衣</p>
                          <span className="h-currency bold note-text">
                            NT$24,000
                          </span>
                          <br />
                          <p className="h-currency  bold h-now text-decoration-line-through">
                            NT$28,000
                          </p>
                          <div className="bi-icon">
                            {/* <i className="bi bi-suit-heart"></i> */}
                            <i className="bi bi-person-heart"></i>
                            {/* <i className="bi bi-bookmark-heart"></i> */}
                            {/* <i className="bi bi-cart4"></i> */}
                            <i className="bi bi-cart-plus-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 9結束 */}
                    <Pagination />
                  </div>
                </div>
              </div>
            </div>
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
        .bi-icon {
          font-size: 20px;
        }
        .navigation {
          display: flex;
          justify-content: flex-end;
        }

         {
          /* move */
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
          // width: 360px;
          width: 100%;
        }

        .w-350 img {
          width: 100%;
        }

        .card-text {
          font-weight: 500;
          margin-bottom: 0.15rem;
        }

        .note-text {
          color: var(--red, #dc5151);
        }

        .type-text {
          color: var(--gray, #858585);
          font-weight: normal;
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

        .cats {
          border-bottom: 0.05rem solid gray;
          min-height: 200px;
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

        .h-now {
          font-size: 16px;
          color: rgb(17, 17, 17);
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

        // font-size
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
