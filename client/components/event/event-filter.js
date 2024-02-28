import React from 'react'
import styles from './event-filter.module.scss'
import { IoSearch } from 'react-icons/io5'

export default function EventFilter() {
  return (
    <>
      <div className={`${styles.filterBar} px-5`}>
        <div className="container d-flex align-items-center justify-content-end">
          <ul className={`d-flex m-0 p-0 ${styles.filterMenu}`}>
            <li>
              <button type="submit"> 所有活動</button>
            </li>
            <li>
              <button type="submit">優惠活動</button>
            </li>
            <li>
              <button type="submit">潛水活動</button>
            </li>
            <li>
              <button type="submit">海洋環保</button>
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
