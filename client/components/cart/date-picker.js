import React, { useEffect } from 'react'

import { GoChevronLeft } from 'react-icons/go'
import { GoChevronRight } from 'react-icons/go'

export default function DatePicker() {
  useEffect(() => {
    const divMonth = document.querySelector('.month')
    const btnLeft = document.querySelector('.leftBtn')
    const btnRight = document.querySelector('.rightBtn')
    const divDates = document.querySelector('.dates')
    let selectDate

    const wHeight = 60

    const disabledAry = ['2024-02-11']

    let currentDate = new Date()

    btnLeft.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1)
      randerCalendar()
    })
    btnRight.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1)
      randerCalendar()
    })

    randerCalendar()

    function randerCalendar() {
      divDates.innerHTML = ''

      let totalWeeks = weeksInMonth(
        currentDate.getFullYear(),
        currentDate.getMonth()
      )
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

        node.innerHTML = `<div class="jsx-6d5b15dfcc792ec0 date" y="${yy}" m="${mm}" d="${dd}">${i}</div>`

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

      const divDate = document.querySelectorAll('.date')

      for (let i = 0; i < divDate.length; i++) {
        divDate[i].addEventListener('click', () => {
          let selectY = divDate[i].getAttribute('y')
          let selectM = divDate[i].getAttribute('m')
          let selectD = divDate[i].getAttribute('d')
          selectDate = `${selectY}-${selectM}-${selectD}`
          const divCurrentDate = document.querySelector('.currentDate')
          if (divCurrentDate) {
            divCurrentDate.classList.remove('currentDate')
          }
          divDate[i].classList.add('currentDate')
        })
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
      <div className="calendarContainer">
        <div className="calendar">
          <div className="nav d-flex align-items-center justify-content-between">
            <GoChevronLeft className="leftBtn" />
            <div className="month">2024-02</div>
            <GoChevronRight className="rightBtn" />
          </div>
          <div className="week unit1">
            <div className="weekday">S</div>
            <div className="weekday">M</div>
            <div className="weekday">T</div>
            <div className="weekday">W</div>
            <div className="weekday">T</div>
            <div className="weekday">F</div>
            <div className="weekday">S</div>
          </div>
          <div className="dates unit1"></div>
        </div>
      </div>
      <style jsx>{`
        .calendarContainer {
          display: flex;
          justify-content: center;
          .calendar {
            width: calc(100% - 20px);
            .nav {
              display: flex;
              justify-content: space-between;
            }
            .week {
              font-weight: bold;
            }
            .dates {
              .date {
                display: flex;
                justify-content: center;
                align-items: center;
                user-select: none;
                cursor: pointer;
                height: 3rem;
                &:hover {
                  background-color: orange;
                }
              }
              .disabled {
                color: white;
                background-color: #d9d9d9;
                cursor: not-allowed;
              }
              .currentDate {
                background-color: orange;
                color: white;
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
