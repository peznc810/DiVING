import React, { useEffect } from 'react'

export default function AutoTab({ className, maxLength }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const functionKeys = [
        8, 9, 16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 144,
      ]

      if (
        event.target.value.length === maxLength &&
        !functionKeys.includes(event.keyCode)
      ) {
        const nextInput = event.target.nextElementSibling
        if (nextInput && nextInput.classList.contains(className)) {
          nextInput.focus()
        }
      }

      if (event.keyCode === 8 && event.target.value.length === 0) {
        const prevInput = event.target.previousElementSibling
        if (prevInput && prevInput.classList.contains(className)) {
          prevInput.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [className, maxLength])

  return null
}
