import React, { useState, useContext, createContext, useEffect } from 'react'

const UsingCouponContext = createContext(null)

export const UsingCouponProvider = ({
  children,
  initialCoupon = null,
  localStorageKey = 'coupon',
}) => {
  const [coupon, setCoupon] = useState(() => {
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
        window.localStorage.setItem(localStorageKey, JSON.stringify(coupon))
      }
    } catch (error) {
      console.log(error)
    }
  }, [coupon])

  const applyCoupon = (newCoupon) => {
    setCoupon(newCoupon)
  }

  const removeCoupon = () => {
    setCoupon(null)
  }

  return (
    <UsingCouponContext.Provider
      value={{
        coupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </UsingCouponContext.Provider>
  )
}

export const useUsingCoupon = () => useContext(UsingCouponContext)
