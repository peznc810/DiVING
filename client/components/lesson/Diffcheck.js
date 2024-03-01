import React from 'react'

// 課程難度input
export default function DiffCheck() {
  const difficultys = ['體驗', '初階', '中階', '高級']
  return (
    <>
      {difficultys.map((item, i) => (
        <div key={i} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={() => {}}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            {item}
          </label>
        </div>
      ))}
    </>
  )
}
