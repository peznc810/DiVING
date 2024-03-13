import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'

// 建立coupon資料的context
const couponHasContext = createContext()

export default function CouponHasProvider({ children }) {
  const [couponHas, setCouponHas] = useState([])
  const { auth } = useAuth()
  const authID = auth.id
  console.log(auth)
  // 讀取會員所有coupon
  useEffect(() => {
    if (auth && authID) {
      const url = `http://localhost:3005/api/coupon/${authID}`
      fetch(url, {
        method: 'get',
      })
        .then((response) => {
          return response.json()
        })
        .then((results) => {
          const newCouponHas = results.sort((a, b) => {
            b.coupon_id - a.coupon_id
          })
          setCouponHas(newCouponHas)
          console.log(newCouponHas)
        })
        .catch((error) => {
          console.log('連線錯誤')
        })
    }
  }, [auth])

  return (
    <couponHasContext.Provider
      value={{ couponHas, auth, authID, setCouponHas }}
    >
      {children}
    </couponHasContext.Provider>
  )
}

export const useCouponHas = () => {
  return useContext(couponHasContext)
}
