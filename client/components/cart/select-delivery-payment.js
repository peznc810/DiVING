import React from 'react'

export default function SelectDeliveryPayment({
  payment,
  delivery,
  setPayment,
  setDelivery,
}) {
  const handleSelectChange = (e) => {
    const { name, value } = e.target
    name === 'payment' ? setPayment(value) : setDelivery(value)
  }

  return (
    <div className="col-sm-7 pay-section">
      <h5 className="mb-3 section-name span">選擇送貨及付款方式</h5>
      <div className="container">
        <p className="select-dec">送貨方式</p>
        <select
          className="form-select"
          name="delivery"
          value={delivery}
          onChange={handleSelectChange}
        >
          <option value="1">宅配</option>
          <option value="2">7-11</option>
        </select>
        <p className="select-dec">付款方式</p>
        <select
          className="form-select"
          name="payment"
          value={payment}
          onChange={handleSelectChange}
        >
          <option value="1">貨到付款</option>
          <option value="2">信用卡付款</option>
          <option value="3">Line Pay</option>
        </select>
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

        .section-name {
          background-color: #f5f5f5;
          padding: 0.5rem;
        }

        .pay-section {
          border: 1px solid #f5f5f5;
          padding: 0;
        }

        .form-select {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  )
}
