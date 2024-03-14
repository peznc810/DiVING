import { useMemo, useEffect, useState } from 'react'
import { Router, useRouter } from 'next/router'

import Star from '@/components/product/star/star'
import Card from '@/components/product/list/card'
import Order from '@/components/product/list/order'
import Search from '@/components/product/list/search'
import Filter from '@/components/product/list/filter'
import Pagination from '@/components/product/list/pagination'
import Loading from '@/components/layout/loading/loading'

import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { FaHome } from 'react-icons/fa'

const perPage = 6

export default function List() {
  // const router = useRouter()
  // const { productBrand } = router.query
  const [loading, setLoading] = useState(false)

  const [product, setProduct] = useState([])
  // console.log(product)
  const [rating, setRating] = useState(0) //評分

  // useEffect(() => {
  //   if (productBrand) {
  //     if (productBrand === 'ADISI') {
  //       setProduct(
  //         product.filter((v) => {
  //           v.brand === productBrand
  //         })
  //       )
  //     }
  //   }
  // }, [productBrand])

  // console.log()
  // console.log(product)

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

  //Loading跳轉頁面
  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 1500)
  // }, [])

  const [filterSettings, setFilterSettings] = useState({
    brand: '',
    category: '',
    page: 1,
    price: '',
    searchKey: '',
  })

  const clearSettings = () => {
    setFilterSettings({
      brand: '',
      category: '',
      page: 1,
      price: '',
      searchKey: '',
    })
  }

  const filteredProducts = useMemo(() => {
    const { brand, category, price, searchKey } = filterSettings
    let filteredProducts = product
    if (brand) {
      filteredProducts = filteredProducts.filter((v) => v.brand === brand)
    }
    if (category) {
      filteredProducts = filteredProducts.filter((v) => v.category === category)
    }
    if (price) {
      filteredProducts = filteredProducts.filter((item) => {
        let finalPrice = item.discount || item.price
        if (price === '$1000以下') {
          return finalPrice < 1000
        }
        if (price === '$1001-$3500') {
          return finalPrice >= 1001 && finalPrice <= 3500
        }
        if (price === '$3501-$6500') {
          return finalPrice >= 3501 && finalPrice <= 6500
        }
        if (price === '$6501以上') {
          return finalPrice > 6500
        }
        return true
      })
    }
    if (searchKey) {
      filteredProducts = filteredProducts.filter((v) =>
        v.name.includes(searchKey)
      )
    }
    return filteredProducts
  }, [product, filterSettings])

  const [sorting, setSorting] = useState('')

  const currentSortedPageFilteredProduct = useMemo(() => {
    let result = filteredProducts
    switch (sorting) {
      case 'all':
        result.sort((a, b) => {
          return a.id - b.id
        })
        break
      case 'createdAt':
        result.sort((a, b) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
        })
        break
      case 'descending':
        result.sort((a, b) => {
          return b.price - a.price
        })
        break
      case 'ascending':
        result.sort((a, b) => {
          return a.price - b.price
        })
        break
      default:
        break
    }
    const { page } = filterSettings
    result = result
    if (page === 1) {
      result = result.slice(0, perPage)
    } else {
      result = result.slice((page - 1) * perPage, page * perPage)
    }
    return result
  }, [filteredProducts, filterSettings, sorting])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await fetch('http://localhost:3005/api/product', {
          method: 'GET',
          // body: JSON.stringify({}) POST
        })
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            console.log(data)
            setProduct(data ? data : [])
          })
      } catch {
        ;(err) => {
          console.error('Error fetching data:', err)
        }
      }
    }
    fetchProduct()
  }, [])

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/product')
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((data) => {
  //       setProduct(data ? data.data : [])
  //     })
  // }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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

              {filterSettings.brand && (
                <Breadcrumb.Item href="">
                  {filterSettings.brand}
                </Breadcrumb.Item>
              )}
              {filterSettings.category && (
                <Breadcrumb.Item href="">
                  {filterSettings.category}
                </Breadcrumb.Item>
              )}
            </Breadcrumb>

            <div className="row mt-2 mb-3">
              <div className="card-text d-flex justify-content-between align-items-center">
                <h6 className="ps-3 my-1"></h6>
                {/* 排序 */}
                <Order setSorting={setSorting} />
              </div>
            </div>
            <div className="row text-center">
              <div className="col-sm-12">
                <div className="d-flex" id="wrapper">
                  <div className="bg-white me-3" id="sidebar-wrapper">
                    <div className="scroll">
                      {/* 搜尋 */}
                      <Search setFilterSettings={setFilterSettings} />

                      {/* 篩選 filter */}
                      <div className="my-2">
                        <div className="accordion accordion-flush">
                          <Filter
                            product={product}
                            setFilterSettings={setFilterSettings}
                            filterSettings={filterSettings}
                            clearSettings={clearSettings}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 卡片 */}
                  <div id="page-content-wrapper">
                    <div className="container-fluid">
                      <div className="row row-cols-1 row-cols-md-3 g-4">
                        {Array.isArray(currentSortedPageFilteredProduct) &&
                          currentSortedPageFilteredProduct.map((value) => (
                            <Card
                              key={value}
                              value={value}
                              setProduct={setProduct}
                              rating={rating}
                              setRating={setRating}
                            />
                          ))}
                      </div>
                    </div>
                    <Pagination
                      totalPages={Math.ceil(filteredProducts.length / perPage)}
                      setFilterSettings={setFilterSettings}
                      page={filterSettings.page}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .container-1200 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
          margin-top: 10px;
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
