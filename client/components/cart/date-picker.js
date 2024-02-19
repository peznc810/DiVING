import React, { useEffect } from 'react'
import { GoChevronLeft } from 'react-icons/go'
import { GoChevronRight } from 'react-icons/go'

export default function DatePicker() {
  useEffect(() => {
    const divMonth = document.querySelector('.month')
    const divCalendarContainer = document.querySelector('.calendarContainer')
    const btnLeft = document.querySelector('.leftBtn')
    const btnRight = document.querySelector('.rightBtn')
    const divDates = document.querySelector('.dates')
    const divDatePicker = document.querySelector('.datepicker')
    const inputDate = document.querySelector('.datepicker input')

    const wHeight = 60

    const disabledAry = ['2024-02-11']

    let currentDate = new Date()

    btnLeft.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1)
    })
    btnRight.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1)
    })

    randerCalendar()

    function randerCalendar() {
      divDates.innerHTML = ''

      let totalWeeks = weeksInMonth(
        currentDate.getFullYear(),
        currentDate.getMonth()
      )
      console.log(totalWeeks)
      let dateHeight = Math.floor((wHeight - 60 - 30) / totalWeeks)

      document.documentElement.style.setProperty(
        '--date-height',
        dateHeight + 'px'
      )

      let cY = currentDate.getFullYear()
      let cM = currentDate.toLocaleString('zh-TW', { month: 'long' })
      divMonth.innerHTML = `${cY}年${cM}`

      let firstDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      )

      let firstDay = firstDate.getDay()

      for (let i = 0; i < firstDay; i++) {
        const node = document.createElement('div')
        divDates.append(node)
      }

      let totalDays = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate()

      for (let i = 1; i <= totalDays; i++) {
        const node = document.createElement('div')

        const dd = i.toString().padStart(2, '0')
        const mm = (currentDate.getMonth() + 1).toString().padStart(2, '0')
        const yy = currentDate.getFullYear()

        node.innerHTML = `<div class="date" y="${yy}" m="${mm}" d="${dd}">${i}</div>`

        if (
          i === new Date().getDate() &&
          currentDate.getMonth() === new Date().getMonth() &&
          currentDate.getFullYear() === new Date().getFullYear()
        ) {
          node.children[0].classList.add('currentDate')
        }

        disabledAry.map((dd) => {
          let date1 = new Date(dd)
          let date2 = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            i
          )
          if (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
          ) {
            node.children[0].classList.add('disabled')
          }
        })

        divDates.append(node.children[0])
      }
    }

    function weeksInMonth(year, month) {
      const firstDateOfMonth = new Date(year, month)
      const lastDateOfMonth = new Date(year, month + 1, 0)
      const firstDayOfMonth = firstDateOfMonth.getDay()
      const totalDays = lastDateOfMonth.getDate()
      const daysInFirstweek = firstDayOfMonth === 0 ? 0 : 7 - firstDayOfMonth
      const otherDays = totalDays - daysInFirstweek
      const weeks = Math.ceil(otherDays / 7)
      const totalWeeks = weeks + (daysInFirstweek > 0 ? 1 : 0)
      return totalWeeks
    }
  })

  return (
    <>
      <div className="d-flex"></div>
      <div class="calendarContainer">
        <div class="calendar">
          <div className="nav d-flex align-items-center justify-content-between">
            <GoChevronLeft className="leftBtn" />
            <div class="month">2024-02</div>
            <GoChevronRight className="rightBtn" />
          </div>
          <div class="week unit1">
            <div class="weekday">S</div>
            <div class="weekday">M</div>
            <div class="weekday">T</div>
            <div class="weekday">W</div>
            <div class="weekday">T</div>
            <div class="weekday">F</div>
            <div class="weekday">S</div>
          </div>
          <div class="dates unit1"></div>
        </div>
      </div>
      <style jsx>{`
        .calendarContainer {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: #515151;
          z-index: 1;
          display: flex;
          justify-content: center;
          .calendar {
            background-color: #ea78b9;
            width: calc(100% - 20px);
            height: fit-content;
            .nav {
              height: var(--nav-height);
              display: flex;
              justify-content: space-between;
            }
            .week {
              height: var(--week-height);
              font-weight: bold;
            }
            .dates {
              .date {
                height: var(--date-height);
                user-select: none;
                cursor: pointer;
                &:hover {
                  background-color: #e671a2;
                }
              }
              .disabled {
                color: #909090;
                background-color: #909090;
                cursor: not-allowed;
                &:hover {
                  background-color: #909090;
                }
              }
              .currentDate {
                background-color: #fb229d;
              }
            }
            .unit1 {
              display: grid;
              grid-template-columns: repeat(7, 1fr);
              text-align: center;
            }
          }
        }
      `}</style>
    </>
  )
}
