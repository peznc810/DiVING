import { useEffect, useState } from 'react'

import Stars from '@/components/product/star/star'
import Card from '@/components/product/list/card'
import Order from '@/components/product/list/order'
import Search from '@/components/product/list/search'
import Filter from '@/components/product/list/filter'
import Pagination from '@/components/product/list/pagination'
import Link from 'next/link'

import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { FaHome } from 'react-icons/fa'
import { MdScubaDiving } from 'react-icons/md'
import { MdOutlineCategory } from 'react-icons/md'
import { GoHeartFill } from 'react-icons/go'
import { FaCartPlus } from 'react-icons/fa'

export default function List() {
  const [product, setProduct] = useState([])
  const [originalData, setOriginalData] = useState([])

  const [currentBrand, setCurrentBrand] = useState('')
  const [currentCategory, setCurrentCategory] = useState('')

  console.log(product)

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

  useEffect(() => {
    fetch('http://localhost:3000/api/product')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setProduct(data ? data.data : [])
        setOriginalData(data)
      })
  }, [])

  return (
    <>
      <div className="container-1200">
        {/* 麵包屑 */}
        <Breadcrumb>
          <Breadcrumb.Item href="http://localhost:3000">
            <FaHome />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="http://localhost:3000/product">
            商品列表
          </Breadcrumb.Item>

          {currentBrand && (
            <Breadcrumb.Item href="">{currentBrand}</Breadcrumb.Item>
          )}
          {currentCategory && (
            <Breadcrumb.Item href="">{currentCategory}</Breadcrumb.Item>
          )}
        </Breadcrumb>

        <div className="row mt-2 mb-3">
          <div className="card-text d-flex justify-content-between align-items-center">
            <h6 className="ps-3 my-1">所有商品（70）</h6>
            {/* 排序 */}
            <Order product={product} setProduct={setProduct} />
          </div>
        </div>
        <div className="row text-center">
          <div className="col-sm-12">
            <div className="d-flex" id="wrapper">
              <div className="bg-white me-3" id="sidebar-wrapper">
                <div className="scroll">
                  {/* 搜尋 */}
                  <Search product={product} setProduct={setProduct} />

                  {/* 篩選 filter */}
                  <div className="my-2">
                    <div className="accordion accordion-flush">
                      <Filter
                        product={product}
                        setProduct={setProduct}
                        setCurrentBrand={setCurrentBrand}
                        setCurrentCategory={setCurrentCategory}
                        originalData={originalData}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 卡片 */}
              <div id="page-content-wrapper">
                <div className="container-fluid">
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {Array.isArray(product) &&
                      product.map((value) => (
                        <Card
                          key={value}
                          value={value}
                          product={product}
                          setProduct={setProduct}
                        />
                      ))}
                  </div>
                </div>
                <Pagination
                  product={product}
                  setProduct={setProduct}
                  originalData={originalData}
                />
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
      `}</style>
    </>
  )
}
