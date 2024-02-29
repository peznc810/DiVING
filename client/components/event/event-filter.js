import React, { useState } from 'react'
import styles from './event-filter.module.scss'
import { IoSearch } from 'react-icons/io5'

export default function EventFilter({ eventList, onFilter = () => {} }) {
  const [filterItem, setFilterItem] = useState(eventList)
  const [activeFilter, setActiveFilter] = useState('all')

  // 篩選
  const handleFilter = (filterType) => {
    if (filterType === 'all') {
      setFilterItem(eventList)
      onFilter(eventList)
    } else {
      const filtered = eventList.filter((item) => item.sort === filterType)
      setFilterItem(filtered)
      onFilter(filtered)
      // console.log(filtered)
    }
    setActiveFilter(filterType)
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
          <div className={`input-group ${styles.search} `}>
            <input
              className={`form-control`}
              type="text"
              placeholder="Search..."
            />
            <button type="submit" className={`btn `}>
              <IoSearch />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
