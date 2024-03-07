import { createContext, useContext, useState, useEffect } from 'react'
// import eventData from '@/data/event/event.json'

// 建立event資料的context
const EventContext = createContext()

// 協助全站(_app.js)裡套用Provider的元件，集中要使用的狀態
export default function EventProvider({ children }) {
  const [eventList, setEventList] = useState([]) //設定一開始狀態為空陣列
  const url = 'http://localhost:3005/api/event'

  useEffect(() => {
    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        // console.log(result)
        // 將json裏面的字串轉成日期，產生新的陣列
        const formatEvent = result.map((item) => {
          return {
            ...item,
            created_at: new Date(item.created_at),
          }
        })
        // 時間由近到遠做排序
        const sortEvent = formatEvent.sort(
          (a, b) => b.created_at - a.created_at
        )
        setEventList(sortEvent)
      })
      .catch(() => {
        console.log('連接錯誤')
      })
  }, [])

  return (
    <EventContext.Provider value={eventList}>{children}</EventContext.Provider>
  )
}

// 包裝好專用於此context的勾子名稱
export const useEvent = () => useContext(EventContext)
