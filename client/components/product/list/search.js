import { useMemo, useState } from 'react'

export default function SearchProduct({ product, setProduct }) {
  return (
    <div className="pe-1 my-3">
      <form className="d-flex" role="search">
        <div className="input-group position-relative d-inline-flex align-items-center">
          <input
            type="text"
            className="form-control border-end"
            placeholder="搜尋商品"
            aria-label="from"
            aria-describedby="from"
            style={{
              borderRadius: 2.8,
            }}
          />
          <i
            className="bi bi-search position-absolute"
            role="presentation"
            style={{ right: 10, cursor: 'pointer', zIndex: 100 }}
          ></i>
        </div>
      </form>
    </div>
  )
}
