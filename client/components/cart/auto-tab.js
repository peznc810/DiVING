import React, { useEffect } from 'react'

export default function AutoTab({ className, maxLength }) {
  useEffect(() => {
    const functionKeys = [
      8, 9, 16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 144,
    ]

    const handleKeyDown = (event) => {
      const { value } = event.target
      const { keyCode } = event

      const isMaxLengthReached = value && value.length === maxLength
      const isFunctionKey = functionKeys.includes(keyCode)

      if (isMaxLengthReached && !isFunctionKey) {
        focusNextInput(event.target)
      }

      if (keyCode === 8 && value.length === 0) {
        focusPrevInput(event.target)
      }
    }

    const focusNextInput = (currentInput) => {
      if (currentInput.className.includes(`${className}`)) {
        const nextDiv = currentInput.closest('div').nextElementSibling
        if (nextDiv) {
          const nextInput = nextDiv.querySelector(`.${className}`)
          if (nextInput) {
            nextInput.focus()
          }
        }
      }
    }

    const focusPrevInput = (currentInput) => {
      const prevDiv = currentInput.closest('div').previousElementSibling
      if (prevDiv) {
        const prevInput = prevDiv.querySelector(`.${className}`)
        if (prevInput) {
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
