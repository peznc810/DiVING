import React, { useState } from 'react'
import styles from './latest-news.module.scss'
import EventCard from './event-card'
import EventFilter from './event-filter'

export default function EventList({ eventList }) {
  const itemsPrePage = 12 //設定每頁12個
  const [currentPage, setCurrentPage] = useState(1) //初始值為第一頁
  const [filterItems, setFilterItems] = useState(eventList)

  // 分頁
  const lastItemIndex = itemsPrePage * currentPage //計算當前頁面“最後一個”品項的索引範圍
  const firstItemIndex = lastItemIndex - itemsPrePage //計算當前頁面“起始”品項的索引
  const currentItems = filterItems.slice(firstItemIndex, lastItemIndex) //擷取出商品範圍，得到當前頁面該顯示的商品

  const totalPages = Math.ceil(filterItems.length / itemsPrePage) //算出頁數

  const handlePage = (newPage) => {
    setCurrentPage(newPage)
  }
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }
  const prePage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  // 篩選 & 收尋
  //(子女)要傳進篩選、收尋結果的狀態
  const onFilter = (filterSort) => {
    // 篩選活動
    const filtered =
      filterSort === 'all'
        ? eventList
        : eventList.filter((event) => filterSort === event.sort)

    // 渲染更新的活動列表
    setCurrentPage(1) //前頁數重置第一頁
    setFilterItems(filtered)
  }

  const onSearch = (keyWord, filterSort) => {
    // 收尋活動
    const filtered =
      filterSort === 'all'
        ? eventList
        : eventList.filter((event) => filterSort === event.sort)
    const searched = filtered.filter((event) =>
      event.title.toUpperCase().includes(keyWord.toUpperCase())
    )

    setFilterItems(searched)
  }

  return (
    <>
      {/* ======== 活動列表 ======== */}
      <section className={`container mb-5`}>
        <div className={` ${styles.allList}`}>
          <div className={` border-bottom border-3 border-info `}>
            <h2 className="text-info fw-bold ps-3">ALL EVENTS</h2>
          </div>
        </div>
        {/* 篩選＆收尋 */}
        <EventFilter
          eventList={eventList}
          onFilter={onFilter}
          onSearch={onSearch}
        />
        {/* 活動項目 */}
        <EventCard eventList={currentItems} />

        {/* 分頁 */}
        <nav aria-label="Page navigation example ">
          <ul className={`pagination justify-content-center my-5`}>
            <li
              className={`page-item ${
                currentPage === 1 ? 'd-none' : 'd-block'
              }`}
            >
              <button
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={prePage}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => {
              return (
                <li key={index} className={`page-item `}>
                  <button
                    className={`page-link ${
                      currentPage === index + 1 ? styles.pageBtn : ''
                    }`}
                    type="button"
                    onClick={() => handlePage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            })}

            <li className="page-item">
              <button
                className={`page-link ${
                  totalPages === 1 || firstItemIndex <= 0 ? 'd-none' : 'd-block'
                }`}
                href="#"
                aria-label="Next"
                onClick={nextPage}
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}
