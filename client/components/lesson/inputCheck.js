import React from 'react'
import { useContext } from 'react'
import { DiffCheck } from '@/context/value'

function CheckboxGroup({ items, title, handleOnchange }) {
  return (
    <div className="mb-3">
      <div className="fs-4">{title}</div>
      {items.map((item, i) => (
        <div key={i} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={item.name}
            id=""
            htmlFor=""
            onChange={(event) => handleOnchange(event, i)}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            {item.name}
          </label>
        </div>
      ))}
    </div>
  )
}

export default function AddrCheck() {
  const locations = [
    { id: 1, name: '東北角', sort: '地點' },
    { id: 2, name: '東部海岸', sort: '地點' },
    { id: 3, name: '墾丁', sort: '地點' },
    { id: 4, name: '澎湖', sort: '地點' },
    { id: 5, name: '小琉球', sort: '地點' },
    { id: 6, name: '蘭嶼', sort: '地點' },
    { id: 7, name: '初階', sort: '難度' },
    { id: 8, name: '中階', sort: '難度' },
    { id: 9, name: '高階', sort: '難度' },
  ]
  const { checkvalue, setCheckvalue } = useContext(DiffCheck)
  const handleOnchange = (event, index) => {
    const getvalue = event.target.value
    if (event.target.checked) {
      const upCheckedState = checkvalue.map((state, i) => {
        return i === index ? getvalue : state
      })
      setCheckvalue(upCheckedState)
    } else {
      const upCheckedState = checkvalue.map((state, i) => {
        return i === index ? false : state
      })
      setCheckvalue(upCheckedState)
    }
    console.log(getvalue)
  }

  const locationsBySort = {
    地點: locations.filter((item) => item.sort === '地點'),
    難度: locations.filter((item) => item.sort === '難度'),
  }

  return (
    <>
      {Object.entries(locationsBySort).map(([sort, items]) => (
        <CheckboxGroup
          key={sort}
          title={sort}
          items={items}
          handleOnchange={handleOnchange}
        />
      ))}
    </>
  )
}
// export default function AddrCheck() {
//   const locations = [
//     { id: 1, name: '東北角', sort: '地點' },
//     { id: 2, name: '東部海岸', sort: '地點' },
//     { id: 3, name: '墾丁', sort: '地點' },
//     { id: 4, name: '澎湖', sort: '地點' },
//     { id: 5, name: '小琉球', sort: '地點' },
//     { id: 6, name: '蘭嶼', sort: '地點' },
//     { id: 7, name: '初階', sort: '難度' },
//     { id: 8, name: '中階', sort: '難度' },
//     { id: 9, name: '高級', sort: '難度' },
//   ]
//   const { checkvalue, setCheckvalue } = useContext(DiffCheck)

//   const handleOnchange = (event, index) => {
//     const getvalue = event.target.value
//     if (event.target.checked) {
//       const upCheckedState = checkvalue.map((state, i) => {
//         return i === index ? getvalue : state
//       })
//       setCheckvalue(upCheckedState)
//     } else {
//       const upCheckedState = checkvalue.map((state, i) => {
//         return i === index ? false : state
//       })
//       setCheckvalue(upCheckedState)
//     }
//     console.log(getvalue)
//   }
//   return (
//     <>
//       <div className="mb-3">
//         <div className="fs-4">地點</div>
//         {locations.map((item, i) => {
//           if (item.sort == '地點') {
//             return (
//               <div key={i} className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   value={item.name}
//                   id=""
//                   htmlFor=""
//                   onChange={(event) => handleOnchange(event, i)}
//                 />
//                 <label className="form-check-label" htmlFor="flexCheckDefault">
//                   {item.name}
//                 </label>
//               </div>
//             )
//           }
//         })}
//       </div>
//       <div className="mb-3">
//         <div className="fs-4">潛點等級</div>
//         {locations.map((item, i) => {
//           if (item.sort == '難度') {
//             return (
//               <div key={i} className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   value={item.name}
//                   id=""
//                   htmlFor=""
//                   onChange={(event) => handleOnchange(event, i)}
//                 />
//                 <label className="form-check-label" htmlFor="flexCheckDefault">
//                   {item.name}
//                 </label>
//               </div>
//             )
//           }
//         })}
//       </div>
//     </>
//   )
// }
