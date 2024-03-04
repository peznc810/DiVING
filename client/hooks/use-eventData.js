import { createContext, useContext, useState } from 'react'
import eventData from '@/data/event/event.json'

// 建立event資料的context
const EventContext = createContext()

// 協助全站(_app.js)裡套用Provider的元件，集中要使用的狀態
export default function EventProvider({ children }) {
  // 共享event的資料狀態
  const [eventDataState] = useState(eventData)

  // 將json裏面的字串轉成日期，產生新的陣列
  const eventList = eventDataState.map((item) => {
    return {
      ...item,
      created_at: new Date(item.created_at),
    }
  })

  // 時間由近到遠做排序
  eventList.sort((a, b) => b.created_at - a.created_at)

  return (
    <EventContext.Provider value={eventList}>{children}</EventContext.Provider>
  )
}

// 包裝好專用於此context的勾子名稱
export const useEvent = () => useContext(EventContext)
