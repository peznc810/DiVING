import React from 'react'

export default function OrderProduct() {
  return (
    <div className="d-flex p-2 justify-content-end align-items-center">
      <div className="toolbar">
        <button className="btn" id="sidebarToggle">
          隱藏篩選條件 <i className="bi bi-toggles"></i>
        </button>
      </div>

      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          商品排序
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              最新上架商品
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              價格：由高至低
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              價格：由低至高
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
