import React, { useState } from 'react'

export default function Test() {
  const [isChecked, setIsChecked] = useState(false)

  const toggleSwitch = () => {
    setIsChecked(!isChecked)

    return console.log(isChecked)
  }

  return (
    <div className="switch">
      <input
        type="checkbox"
        className="switch-checkbox"
        id="switch1"
        checked={isChecked}
        onChange={toggleSwitch}
      />
      <label className="switch-label" htmlFor="switch1">
        <span className={`switch-txt ${isChecked ? 'on' : 'off'}`}></span>
        <span className="switch-Round-btn"></span>
      </label>
    </div>
  )
}
