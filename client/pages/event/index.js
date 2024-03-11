import { useState, useEffect } from 'react'
import EventCarousel from '@/components/event/event-carousel'
import LatestNews from '@/components/event/latest-news'
import EventList from '@/components/event/event-list'
import Loading from '@/components/layout/loading/loading'
import { useEvent } from '@/hooks/use-eventData'

export default function Event() {
  const [loading, setLoading] = useState(false)
  const eventList = useEvent()

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <EventCarousel />
          <LatestNews eventList={eventList} />
          <EventList eventList={eventList} />
        </>
      )}
    </>
  )
}
