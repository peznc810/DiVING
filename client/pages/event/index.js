import React from 'react'
import EventCarousel from '@/components/event/event-carousel'
import LatestNews from '@/components/event/latest-news'
import event from '@/data/event/event.json'

export default function Event() {
  // 將json裏面的字串轉成日期

  event.forEach((item) => {
    item.created_at = new Date(item.created_at)
  })
  // 時間由近到遠做排序
  event.sort((a, b) => b.created_at - a.created_at)

  // console.log(event)

  return (
    <>
      <EventCarousel />
      <LatestNews eventList={event} />
    </>
  )
}
