import React, { useState } from 'react'
import styles from './event-filter.module.scss'
import { IoSearch } from 'react-icons/io5'

export default function EventFilter({
  onFilter = () => {},
  onSearch = () => {},
}) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [filter, setFilter] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleFilter = (filterSort) => {
    setFilter(filterSort) // 重新更新篩選
    onFilter(filterSort)
    setActiveFilter(filterSort) //設定篩選按鈕的點擊狀態
    console.log(filterSort)
  }
  return (
    <>
      <div className={`${styles.filterBar} px-5`}>
        <div className="container d-flex align-items-center justify-content-end">
          <ul className={`d-flex m-0 p-0 ${styles.filterMenu}`}>
            <li>
              <button
                type="button"
                className={`${
                  activeFilter === 'all' ? styles.filterFocus : ''
                }`}
                onClick={() => {
                  handleFilter('all')
                }}
              >
                所有活動
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${
                  activeFilter === '優惠活動' ? styles.filterFocus : ''
                }`}
                onClick={() => {
                  handleFilter('優惠活動')
                }}
              >
                優惠活動
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${
                  activeFilter === '潛水相關' ? styles.filterFocus : ''
                }`}
                onClick={() => {
                  handleFilter('潛水相關')
                }}
              >
                潛水相關
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${
                  activeFilter === '海洋環保' ? styles.filterFocus : ''
                }`}
                onClick={() => {
                  handleFilter('海洋環保')
                }}
              >
                海洋環保
              </button>
            </li>
          </ul>
          {/* 收尋 */}
          <div className={`input-group ${styles.search} `}>
            <input
              className={`form-control`}
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              type="submit"
              className={`btn `}
              onClick={() => {
                onSearch(searchKeyword, filter)
              }}
            >
              <IoSearch />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
