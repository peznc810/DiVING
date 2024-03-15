import React, { useState, useContext, createContext, useEffect } from 'react'

const UsingCouponContext = createContext(null)

export const UsingCouponProvider = ({
  children,
  initialCoupon = {},
  localStorageKey = 'usingCoupon',
}) => {
  const [usingCoupon, setUsingCoupon] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedCoupon = window.localStorage.getItem(localStorageKey)
        return storedCoupon ? JSON.parse(storedCoupon) : initialCoupon
      } catch (error) {
        console.log(error)
      }
    }
    return initialCoupon
  })

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          localStorageKey,
          JSON.stringify(usingCoupon)
        )
      }
    } catch (error) {
      console.log(error)
    }
  }, [usingCoupon])

  const applyUsingCoupon = (newCoupon) => {
    setUsingCoupon(newCoupon)
  }

  const removeUsingCoupon = () => {
    setUsingCoupon(null)
  }

  return (
    <UsingCouponContext.Provider
      value={{
        usingCoupon,
        applyUsingCoupon,
        removeUsingCoupon,
      }}
    >
      {children}
    </UsingCouponContext.Provider>
  )
}

export const useUsingCoupon = () => useContext(UsingCouponContext)
