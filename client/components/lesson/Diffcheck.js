import React from 'react'
import { useContext } from 'react'
import { DiffCheck } from '@/context/value'
import LessonData from '@/data/lesson/lesson'

// 課程難度input
export default function Difflayout() {
  const difficultys = [
    { id: 1, name: '體驗潛水' },
    { id: 2, name: '中階潛水' },
    { id: 3, name: '高級' },
  ]
  // 取得index.js的state
  const { checkvalue, setCheckvalue } = useContext(DiffCheck)
  // 使用index.js的state 給handleOnchenge使用
  const handleOnchange = (event, index) => {
    const a = event.target.value
    if (event.target.checked) {
      const upCheckedState = checkvalue.map((state, i) => {
        return i === index ? a : state
      })
      setCheckvalue(upCheckedState)
    } else {
      const upCheckedState = checkvalue.map((state, i) => {
        return i === index ? false : state
      })
      setCheckvalue(upCheckedState)
    }
    console.log(a)
  }

  return (
    <>
      <div>
        {difficultys.map((item, i) => (
          <div key={i} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={item.name}
              id="flexCheckDefault"
              onChange={(event) => handleOnchange(event, i)}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </>
  )
}
