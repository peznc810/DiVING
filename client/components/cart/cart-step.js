import React, { useEffect } from 'react'

export default function CartStep({ step = 0 }) {
  useEffect(() => {
    document.querySelector(`.step${step}`).classList.add('active')
  })

  return (
    <div className="mb-5">
      <div className="row justify-content-center step-section">
        <div className="col-3">
          <h3 className="step step1">1</h3>
          <h5 className="step-contain text-center">購物車</h5>
        </div>
        <div className="col-3">
          <h3 className="step step2">2</h3>
          <h5 className="step-contain text-center">填寫資料</h5>
        </div>
        <div className="col-3">
          <h3 className="step step3">3</h3>
          <h5 className="step-contain text-center">訂單確認</h5>
        </div>
      </div>
      <style jsx>{`
        .step {
          font-weight: bold;
          text-align: center;
          border-radius: 50%;
          color: white;
          width: 65px;
          height: 65px;
          line-height: 65px;
          background-color: #d9d9d9;
          margin: auto;
          margin-top: 1rem;
          &.active {
            background-color: #ff9720;
          }
        }

        .step-contain {
          color: black;
          font-weight: bold;
          margin-top: 1rem;
        }

        @media (max-width: 576px) {
          .step {
            width: 50px;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
          }

          .step-contain {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  )
}
