import React from 'react'
import DatePicker from '@/components/cart/date-picker'

export default function Home() {
  return (
    <>
      <div>
        <div className="title col-11 mx-auto mt-3">
          <h1 className="text-center text-sm-start">體驗自由潛水</h1>
          <h5 className="mt-2">
            您可以在此查看我們的可預約日期，並選取最合適的日期和時間
          </h5>
        </div>
        <div className="row mt-5 date-section">
          <div className="container col-sm-7">
            <div className="d-flex justify-content-between">
              <h4>選擇日期和時間</h4>
              <h6 className="text-black-50">台北標準時間(GMT+8)</h6>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-6">
                <DatePicker />
              </div>
              <div className="col-sm-6 time-section">
                <h5>X月XX日 星期X</h5>
                <div className="d-flex mt-3">
                  <button
                    type="button"
                    className="btn time-period-btn w-75 active"
                  >
                    <h5 className="fw-bold py-1">上午 X:XX</h5>
                  </button>
                  <div className="w-25"></div>
                  <button type="button" className="btn time-period-btn w-75">
                    <h5 className="fw-bold py-1">下午 XX:XX</h5>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 detail-section">
            <div className="container">
              <h5>服務細節</h5>
              <div className="mt-3">
                <p>課程名稱</p>
                <p>課程時間</p>
                <p className="fs14">地點</p>
                <p className="fs14">價格</p>
              </div>
              <hr />
              <button type="button" className="btn cart-btn w-100">
                <h5 className="fw-bold py-1">加入購物車</h5>
              </button>
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

        .fs14P {
          size: 14px;
        }

        .time-period-btn {
          border: 1px solid #ff9720;
          color: #ff9720;
        }

        .time-period-btn.active {
          background-color: #ff9720;
          color: white;
        }

        .cart-btn {
          background-color: #ff9720;
          color: white;
        }

        @media (max-width: 576px) {
          .date-section {
            margin: 0;
          }

          .detail-section {
            margin-top: 1rem;
            padding-inline: 0;
          }

          .time-section {
            margin-top: 1rem;
          }
        }
      `}</style>
    </>
  )
}
