import React from 'react'
import EventCarousel from '@/components/event/event-carousel'
import LatestNews from '@/components/event/latest-news'
import event from '@/data/event/event.json'
import EventList from '@/components/event/event-list'

export default function Event() {
  // 將json裏面的字串轉成日期，產生新的陣列
  const eventList = event.map((item) => {
    return {
      ...item,
      created_at: new Date(item.created_at),
    }
    // item.created_at = new Date(item.created_at)
  })

  // 時間由近到遠做排序
  eventList.sort((a, b) => b.created_at - a.created_at)

  return (
    <>
      <EventCarousel />
      <LatestNews eventList={eventList} />
      <EventList eventList={eventList} />
    </>
  )
}
