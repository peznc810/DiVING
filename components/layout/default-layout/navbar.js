import React from 'react'
import styles from './navbar.module.scss'

export default function Navbar() {
  return (
    <>
      <div
        className={`container-fluid ${styles.navbar} px-5 d-flex justify-content-between align-items-center`}
      >
        <div>
          <h1 className="">DiVING</h1>
        </div>
        <ul className="d-flex">
          <li>
            <a href="./home">首頁</a>
          </li>
          <li>
            <a href="./active">活動資訊</a>
          </li>
          <li>
            <a href="./products">所有商品</a>
          </li>
          <li>
            <a href="./lesson">課程資訊</a>
            <ul className="d-none">
              <li>
                <a href="">自由潛水</a>
              </li>
              <li>
                <a href="">水肺潛水</a>
              </li>
              <li>
                <a href="">技術潛水</a>
              </li>
              <li>
                <a href="">技術教練課程</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="./map">潛點地圖</a>
          </li>
          <li>
            <a className={styles.loginBtn} href="./login">
              登入/註冊
            </a>
          </li>
          <li>
            <a href="./shopcart" className={styles.cartBtn}>
              <i className={`bi bi-bag-fill ${styles.cartIcon}`}></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
