import { useEffect, useState } from 'react'

import Stars from '@/components/product/star/star'
import Card from '@/components/product/list/card'
import Order from '@/components/product/list/order'
import Search from '@/components/product/list/search'
import Pagination from '@/components/product/list/pagination'
import Link from 'next/link'

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
            <Link
              href="/product/list"
              className="p-2"
              style={{ color: '#303132' }}
            >
              <i class="bi bi-droplet-half p-1"></i>品牌
            </Link>
            <div className="p-1">&gt;</div>
            <Link
              href="/product/list"
              className="p-2"
              style={{ color: '#303132' }}
            >
              <i className="bi bi-droplet p-1"></i>商品種類
            </Link>
          </div>
        </div>

        <div className="row mt-2 mb-3">
          <div className="card-text d-flex justify-content-between align-items-center">
            <h6 className="ps-3 my-1">當前的分類名稱</h6>
            {/* 排序 */}
            <Order />
          </div>
        </div>

        <div className="row text-center">
          <div className="col-sm-12">
            <div className="d-flex" id="wrapper">
              <div className="bg-white me-3" id="sidebar-wrapper">
                <div className="scroll">
                  {/* 搜尋 */}
                  <Search />

                  <div>
                    <button type="button" className="btn my-1 all-product">
                      所有商品
                    </button>
                  </div>

                  {/* 篩選 filter */}
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
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
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
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
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
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
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            $10,000
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卡片 */}
              <div id="page-content-wrapper">
                <div className="container-fluid">
                  <Card />
                </div>

                <Pagination />
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

         {
          /* 分類 */
        }
        .card-text {
          font-weight: 500;
          margin-bottom: 0.1rem;
        }

        /* override by css variable */
        .no-border {
          --bs-border-width: 0;
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

         {
          /* .swiper {
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
        } */
        }
      `}</style>
    </>
  )
}
