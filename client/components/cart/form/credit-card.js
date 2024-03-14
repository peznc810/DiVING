import React from 'react'

export default function CreditCard({
  handleInputChange,
  userInputs,
  setUserInputs,
  cUser,
}) {
  //勾選資料相同 收貨人
  const cardHolderChange = () => {
    setUserInputs((prevState) => ({
      ...prevState,
      cCard_name: cUser.name,
      cCard_address: cUser.address,
    }))
  }

  return (
    <>
      <div className="container credit-card-section">
        <div className="w-100 section-name text-center mb-3">
          <h5 className="span">信用卡付款資訊</h5>
        </div>
        <h6 className="span my-3">※ 信用卡交易資訊 Credit Card Information</h6>
        <div className="row justify-content-between my-3">
          <p className="col-sm-2 col-3 fw-bold">信用卡卡號</p>
          <div className="col-2">
            <input
              type="text"
              className="form-control autotab-4"
              maxLength={4}
              name="cCard_number1"
              defaultValue={userInputs.cCard_number1}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control autotab-4"
              maxLength={4}
              name="cCard_number2"
              defaultValue={userInputs.cCard_number2}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control autotab-4"
              maxLength={4}
              name="cCard_number3"
              defaultValue={userInputs.cCard_number3}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control autotab-4"
              maxLength={4}
              name="cCard_number4"
              defaultValue={userInputs.cCard_number4}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row justify-content-between my-3">
          <p className="col-sm-2 col-3 fw-bold">有效期限</p>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              maxLength={2}
              name="cCard_expirationMonth"
              placeholder="MM"
              defaultValue={userInputs.cCard_expirationMonth}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              maxLength={2}
              name="cCard_expirationYear"
              placeholder="YY"
              defaultValue={userInputs.cCard_expirationYear}
              onChange={handleInputChange}
            />
          </div>
          <p className="col-2 fw-bold">安全碼</p>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              maxLength={3}
              name="cCard_securityCode"
              defaultValue={userInputs.cCard_securityCode}
              onChange={handleInputChange}
            />
          </div>{' '}
        </div>
        <h6 className="span my-3">※ 持卡人資料 Cardholder Information </h6>
        <div className="d-flex my-3">
          <input
            type="checkbox"
            className="credit_cb"
            onClick={() => cardHolderChange()}
          />
          <h6 className="fw-bold">持卡人資料與會員資料相同</h6>
        </div>
        <div className="row justify-content-between">
          <div className="col-6">
            <p className="fw-bold">持卡人姓名</p>
            <input
              type="text"
              className="w-100 form-control cCard_name"
              name="cCard_name"
              defaultValue={userInputs.cCard_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-6">
            <p className="fw-bold">帳單地址</p>
            <input
              type="text"
              className="w-100 form-control cCard_address"
              name="cCard_address"
              defaultValue={userInputs.cCard_address}
              onChange={handleInputChange}
            />
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
