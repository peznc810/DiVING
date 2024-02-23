import React, { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    console.log(localStorage.getItem('cart'))
  }, [])
  return (
    <>
      <h1>清除localStorage</h1>
    </>
  )
}
