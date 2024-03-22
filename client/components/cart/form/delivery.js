import React, { useState, useEffect } from 'react'

import styles from '../cart.module.scss'
import { addressOption } from '@/config/city'

export default function Delivery({
  handleInputChange,
  userInputs: { user_name, user_phone, user_city, user_section, user_road },
  setUserInputs,
  cUser,
}) {
  const [sections, setSections] = useState([])

  useEffect(() => {
    // 根据选择的城市更新区域选项
    const selectedCity = addressOption.find(
      (city) => city.CityName === user_city
    )
    if (selectedCity) {
      setSections(selectedCity.AreaList)
    } else {
      setSections([])
    }
  }, [user_city])

  //勾選資料相同 收貨人
  const deliveryChange = () => {
    const { name, tel, address } = cUser
    const [city, section, road] = address ? address.split(',') : ['', '', '']
    setUserInputs((prevState) => ({
      ...prevState,
      user_name: name,
      user_phone: tel,
      user_city: city,
      user_section: section,
      user_road: road,
    }))
  }

  return (
    <>
      <div className="container">
        <div className={`w-100 ${styles.sectionName} text-center`}>
          <h5 className={`${styles.span}`}>送貨資料</h5>
        </div>
        <div className="container">
          <div className="d-flex mt-3">
            <input
              type="checkbox"
              className="deliver_cb"
              onClick={() => deliveryChange()}
            />
            <h6 className="fw-bold">收貨人資料與會員資料相同</h6>
          </div>

          <div className={`row justify-content-between ${styles.spacing}`}>
            <div className="col-6">
              <p className="fw-bold">收件人名稱</p>
              <input
                type="text"
                className="w-100 form-control user_name"
                name="user_name"
                defaultValue={user_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <p className="fw-bold">收件人電話</p>
              <input
                type="text"
                className="w-100 form-control user_phone"
                name="user_phone"
                defaultValue={user_phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <p className="fw-bold">配送地址</p>
          <div className="row justify-content-between mb-3">
            <div className="col-3">
              <select
                className="form-select user_city"
                value={user_city}
                onChange={handleInputChange}
                name="user_city"
              >
                <option value="0" disabled>
                  縣/市
                </option>
                {addressOption.map((v, i) => {
                  return (
                    <option key={i} value={v.CityName}>
                      {v.CityName}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="col-3">
              <select
                className="form-select user_section"
                value={user_section}
                onChange={handleInputChange}
                name="user_section"
              >
                <option value="0" disabled>
                  區
                </option>
                {sections.map((area, index) => (
                  <option key={index} value={area.AreaName}>
                    {area.AreaName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <input
                type="text"
                className="w-100 form-control user_road"
                name="user_road"
                value={user_road}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
        }
      `}</style>
    </>
  )
}
