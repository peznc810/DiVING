import React from 'react'
import style from '@/styles/lessonStyle/switch.module.scss'

export default function Test({ switchvalue }) {
  return (
    <div className={style.switch}>
      <input
        type="checkbox"
        className={style['switch-checkbox']}
        id="switch"
        checked={switchvalue.isChecked}
        onChange={switchvalue.toggleSwitch}
      />
      <label className={style['switch-label']} htmlFor="switch">
        <span
          className={`${style['switch-txt']} ${
            switchvalue.isChecked ? 'on' : 'off'
          }`}
        ></span>
        <span className={style['switch-Round-btn']}></span>
      </label>
    </div>
  )
}
