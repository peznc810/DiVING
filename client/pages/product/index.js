import { useMemo, useEffect, useState } from 'react'

import Stars from '@/components/product/star/star'
import Card from '@/components/product/list/card'
import Order from '@/components/product/list/order'
import Search from '@/components/product/list/search'
import Filter from '@/components/product/list/filter'
import Pagination from '@/components/product/list/pagination'
import Link from 'next/link'

import styles from './product.module.scss'

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

  const [product, setProduct] = useState(null);    

  useEffect(() => { 
    fetch("http://localhost:3000/api/product").then((res) => {
        return res.json()
    }).then((data)=> setProduct(data))
  }, [])
  
  const items = useMemo(() => {
    if (!product) return [];
    return product.data
  }, [product])
 

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
                  <div className="my-2">
                    <div className="accordion accordion-flush">
                      <Filter />
                    </div>
                  </div>
                </div>
              </div>

              {/* 卡片 */}
              <div id="page-content-wrapper">
                <div className="container-fluid">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                {items.map((data, i) => 
                  <Card key={i} data={data} />
                )}                  
                </div>
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
          margin-top: 70px;
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
