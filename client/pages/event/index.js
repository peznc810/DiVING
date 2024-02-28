import React from 'react'
import EventCarousel from '@/components/event/event-carousel'
import LatestNews from '@/components/event/latest-news'
import event from '@/data/event.json'

export default function Event() {
  const eventList = event.sort(() => {})

  return (
    <>
      <EventCarousel />
      <LatestNews eventList={event} />
    </>
  )
}
