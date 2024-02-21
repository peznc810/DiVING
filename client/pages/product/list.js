import { useEffect } from 'react'

import Stars from '@/components/product/star/star'
import Pagination from 'react-bootstrap/Pagination'

import NavBar from '@/components/layout/default-layout/navbar/'
import Footer from '@/components/layout/default-layout/footer'

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
      <NavBar />
      <div className="container-1200">
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
                    {/* 分頁 */}
                    <nav aria-label="Page navigation example mx-auto">
                      <ul className="pagination">
                        <li className="page-item">
                          <a
                            className="page-link"
                            href="#"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination />
      <Footer />

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
        .bi-icon {
          font-size: 20px;
        }
        .navigation {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  )
}
