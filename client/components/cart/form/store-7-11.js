import React from 'react'

import userData from '@/data/cart/user.json'

//抓取使用者
const user_id = '1'
const [cUser] = userData.filter((v) => {
  return v.user_id === user_id
})

export default function Store711({
  handleInputChange,
  userInputs,
  setUserInputs,
}) {
  return (
    <>
      <div className="container">
        <div className="w-100 section-name text-center">
          <h5 className="span">送貨資料</h5>
        </div>
        <div className="container">
          <div className="row justify-content-between spacing">
            <div className="col-6">
              <p className="fw-bold">收件人名稱</p>
              <input
                type="text"
                className="w-100 form-control user_name"
                name="user_name"
                defaultValue={userInputs.user_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <p className="fw-bold">收件人電話</p>
              <input
                type="text"
                className="w-100 form-control user_phone"
                name="user_phone"
                defaultValue={userInputs.user_phone}
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

        .span {
          color: #013c64;
          font-weight: bold;
        }

        .spacing {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        .section-name {
          background-color: #f5f5f5;
          padding: 0.5rem;
        }
      `}</style>
    </>
  )
}
