import React from 'react'
import EventCarousel from '@/components/event/event-carousel'
import LatestNews from '@/components/event/latest-news'
import EventList from '@/components/event/event-list'
import { useEvent } from '@/hooks/use-eventData'

export default function Event() {
  const eventList = useEvent()
  return (
    <>
      <EventCarousel />
      <LatestNews eventList={eventList} />
      <EventList eventList={eventList} />
    </>
  )
}
