import { useState, useEffect } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import Style from '@/styles/lessonStyle/date.module.scss'

export default function DatePicker({ getDate }) {
  const api = 'http://localhost:3005/api/lesson'
  const [currentDate, setCurrentDate] = useState(new Date())
  const [days, setDays] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().getDate())
  const [bookedDates, setBookedDates] = useState([])

  //get perorder
  const getperoder = async () => {
    try {
      const response = await fetch(`${api}/orderdate`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const arrdate = data.map((v, i) => {
        return v.preorder_date.split('T')[0]
      })
      setBookedDates(arrdate)
      console.log(arrdate)
      return data
    } catch (error) {
      console.error(
        `Failed to fetch data from ${api + '/' + 'orderdate'}: ${error.message}`
      )
      return null
    }
  }

  const handleDateChange = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
    setSelectedDate(date.toLocaleDateString())
    getDate(date.toLocaleDateString())
    setSelectedDate(day)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // 將今天的時間設定為午夜

    // 如果選擇的日期在今天或之後，則更新狀態
    if (date <= today && !bookedDates.includes(date.toLocaleDateString())) {
      setSelectedDate(date.toLocaleDateString())
      getDate(date.toLocaleDateString())
      console.log(bookedDates)
    }
  }

  const handlePreMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1)
    )
  }

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1)
    )
  }

  useEffect(() => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate()

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay()

    const leadingEmptyDays = Array(firstDayOfMonth).fill(null)

    setDays([
      ...leadingEmptyDays,
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ])
  }, [currentDate])
  useEffect(() => {
    getperoder()
    console.log(bookedDates)
  }, [])
  useEffect(() => {
    // getperoder()
    console.log(bookedDates)
  }, [bookedDates])

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      // handleClick(event)
    }
  }

  return (
    <>
      <div className="d-flex"></div>
      <div className={`${Style['calendarContainer']}`}>
        <div className={`${Style['calendar']}`}>
          <div className="nav d-flex align-items-center justify-content-between">
            <GoChevronLeft className="leftBtn" onClick={handlePreMonth} />
            <div className="month">{currentDate.getMonth() + 1}</div>
            <GoChevronRight className="rightBtn" onClick={handleNextMonth} />
          </div>
          <div className={`${Style['week']} ${Style['unit1']} pt-3`}>
            <div className={`${Style['weekday']}`}>S</div>
            <div className={`${Style['weekday']}`}>M</div>
            <div className={`${Style['weekday']}`}>T</div>
            <div className={`${Style['weekday']}`}>W</div>
            <div className={`${Style['weekday']}`}>T</div>
            <div className={`${Style['weekday']}`}>F</div>
            <div className={`${Style['weekday']}`}>S</div>
          </div>
          <div className={`${Style['dates']} ${Style['unit1']} pt-3`}>
            {days.map((day, index) => {
              const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              )
              const today = new Date()
              today.setHours(0, 0, 0, 0) // 將今天的時間設定為午夜

              return (
                <div
                  className={`${Style['date']} ${
                    day === selectedDate ? Style['currentDate'] : ''
                  } ${date < today ? Style['disabled'] : ''} ${
                    bookedDates.includes(date) ? Style['disabled'] : ''
                  }`}
                  key={index}
                  onKeyDown={handleKeyDown}
                  role="button"
                  tabIndex="0"
                  onClick={() => day && handleDateChange(day)}
                >
                  {day || ''}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
