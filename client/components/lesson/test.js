import React, { useState } from 'react'

export default function Test({ switchvalue }) {
  // const [isChecked, setIsChecked] = useState(false)

  // const toggleSwitch = () => {
  //   setIsChecked(!isChecked)

  //   return console.log(isChecked)
  // }

  return (
    <div className="switch">
      <input
        type="checkbox"
        className="switch-checkbox"
        id="switch1"
        checked={switchvalue.isChecked}
        onChange={switchvalue.toggleSwitch}
      />
      <label className="switch-label" htmlFor="switch1">
        <span
          className={`switch-txt ${switchvalue.isChecked ? 'on' : 'off'}`}
        ></span>
        <span className="switch-Round-btn"></span>
      </label>
    </div>
  )
}
