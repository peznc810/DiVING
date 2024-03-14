import React from 'react'

export default function Delivery({
  handleInputChange,
  userInputs,
  setUserInputs,
  cUser,
}) {
  //勾選資料相同 收貨人
  const deliveryChange = () => {
    const { name, tel, address } = cUser
    setUserInputs((prevState) => ({
      ...prevState,
      user_name: name,
      user_phone: tel,
      ...(address && {
        user_city: address.split(',')[0],
        user_section: address.split(',')[1],
        user_road: address.split(',')[2],
      }),
    }))
  }

  return (
    <>
      <div className="container">
        <div className="w-100 section-name text-center">
          <h5 className="span">送貨資料</h5>
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
          <p className="fw-bold">配送地址</p>
          <div className="row justify-content-between mb-3">
            <div className="col-3">
              <select
                className="form-select user_city"
                value={userInputs.user_city}
                onChange={handleInputChange}
                name="user_city"
              >
                <option value="0" disabled>
                  縣/市
                </option>
                <option value="1市">1市</option>
                <option value="2市">2市</option>
                <option value="3市">3市</option>
              </select>
            </div>
            <div className="col-3">
              <select
                className="form-select user_section"
                value={userInputs.user_section}
                onChange={handleInputChange}
                name="user_section"
              >
                <option value="0" disabled>
                  區
                </option>
                <option value="1區">1區</option>
                <option value="2區">2區</option>
                <option value="3區">3區</option>
              </select>
            </div>
            <div className="col-6">
              <input
                type="text"
                className="w-100 form-control user_road"
                name="user_road"
                value={userInputs.user_road}
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
