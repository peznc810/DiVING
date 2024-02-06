import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Navbar() {
  return (
    <div className="container d-flex">
      <div>
        <h1 className="">DiVING</h1>
      </div>
      <ul className="d-flex">
        <li>
          <a href="">首頁</a>
        </li>
        <li>
          <a href="">活動資訊</a>
        </li>
        <li>
          <a href="">所有商品</a>
        </li>
        <li>
          <a href="">課程資訊</a>
          <ul>
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
          <a href="">潛點地圖</a>
        </li>
        <li>
          <a href="">登入/註冊</a>
        </li>
        <li>
          <a href="">
            <i class="bi bi-bag-fill"></i>
          </a>
        </li>
      </ul>
    </div>
  )
}
