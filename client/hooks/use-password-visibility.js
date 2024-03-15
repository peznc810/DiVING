import { useState } from 'react'

// React icon
import { IoEyeSharp } from 'react-icons/io5'
import { IoEyeOffSharp } from 'react-icons/io5'

export default function useShow() {
  // password visibility status
  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(<IoEyeOffSharp />)

  const handleToggle = () => {
    if (type === 'password') {
      setType('text')
      setIcon(<IoEyeSharp />)
    } else {
      setType('password')
      setIcon(<IoEyeOffSharp />)
    }
  }
  return { type, icon, handleToggle }
}
