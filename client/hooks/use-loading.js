import { useState, useEffect, useContext, createContext } from 'react'
import Loading from '@/components/layout/loading/loading'

const loadingContext = createContext()

export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false)

  //   useEffect(() => {
  //     setLoading(true)
  //     setTimeout(() => {
  //       setLoading(false)
  //     }, 3000)
  //   }, [])

  return (
    <loadingContext.Provider value={{ loading, setLoading }}>
      {loading ? <Loading /> : children}
    </loadingContext.Provider>
  )
}

export const useLoading = () => {
  return useContext(loadingContext)
}
