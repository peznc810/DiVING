import React from 'react'

export default function AddrCheck() {
  const titles = ['東北角', '東部海岸', '墾丁', '澎湖', '小琉球', '蘭嶼']
  return (
    <>
      {titles.map((item, i) => (
        <div key={i} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id=""
            htmlFor=""
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
