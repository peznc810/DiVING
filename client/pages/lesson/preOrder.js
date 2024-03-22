import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/cart'
import DatePicker from '@/components/cart/date-picker'
import toast, { Toaster } from 'react-hot-toast'
import Style from '@/styles/lessonStyle/lesson.module.scss'
export default function PreOrder() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [time, setTime] = useState(null)
  const [count, setCount] = useState(0)
  const amclick = () => {
    const am = '9:00'
    setTime(am)
  }
  const pmclick = () => {
    const pm = '15:00'
    setTime(pm)
  }
  console.log(time)
  const handleDateChange = (date) => {
    setSelectedDate(date)
    console.log(selectedDate)
  }
  const router = useRouter()
  const { addItem } = useCart()
  const lid = router.query.lessonId
  const [perorder, setPerOrder] = useState({})

  const getOrderDetail = async () => {
    const res = await fetch(`http://localhost:3005/api/lesson/getlist/${lid}`)
    const data = await res.json()
    const [newData] = data
    setPerOrder(newData)
  }
  useEffect(() => {
    console.log(time)
  }, [time])
  useEffect(() => {
    if (router.isReady) {
      const { lid } = router.query
      getOrderDetail(lid)
    }
  }, [router.isReady])

  const addLesson = (lesson_id, order_time, name, price, num) => {
    const item = {
      lesson_id,
      order_time,
      name,
      price,
      num,
    }
    addItem(item)
    toast.success('已加入購物車')
  }

  return (
    <>
      <div>
        <div className="title col-11 mx-auto mt-3">
          <h1 className="text-center text-sm-start">{perorder.title}</h1>
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
                <DatePicker getDate={handleDateChange} />
              </div>
              <div className="col-sm-6 time-section">
                <div>你選擇的預約時間:</div>
                <h5>{selectedDate}</h5>
                <div className="d-flex mt-3">
                  <button
                    type="button"
                    className="btn time-period-btn w-75 active"
                    onClick={amclick}
                  >
                    <h5 className="fw-bold py-1">AM</h5>
                  </button>
                  <div className="w-25"></div>
                  <button
                    type="button"
                    className="btn time-period-btn w-75"
                    onClick={pmclick}
                  >
                    <h5 className="fw-bold py-1">PM</h5>
                  </button>
                </div>
                {time}
              </div>
            </div>
          </div>
          <div className="col-sm-4 detail-section">
            <div className="container">
              <h5>課程細節</h5>
              <div className="mt-3">
                <p>課程名稱: {perorder.title}</p>
                <p>
                  課程日期:{' '}
                  {perorder.date && typeof perorder.date === 'string'
                    ? perorder.date.split('T')[0]
                    : ''}
                </p>
                <p>課程時段: {time}</p>
                <p className="fs14">上課地點: {perorder.locationDetail}</p>
                <p className="fs14">價格: {perorder.price}</p>
                <div className="d-flex align-items-center">
                  <p>人數：</p>

                  <button
                    className={`${Style['btn-none']}`}
                    onClick={() => setCount(count + 1)}
                  >
                    +
                  </button>
                  <p>{count}</p>
                  <button
                    className={`${Style['btn-none']} `}
                    onClick={() => count > 0 && setCount(count - 1)}
                  >
                    <span className="fs-4">-</span>
                  </button>
                </div>
              </div>
              <hr />
              <button
                type="button"
                className="btn cart-btn w-100"
                onClick={() => {
                  addLesson(
                    lid,
                    selectedDate,
                    perorder.title,
                    perorder.price,
                    1
                  )
                }}
              >
                <h5 className="fw-bold py-1">加入購物車</h5>
                <Toaster />
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
