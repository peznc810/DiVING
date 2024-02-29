// import pool from '../../../../server/db.mjs'

// export default async function handler(req, res) {
//   try {
//     const connection = await pool.getConnection()
//     const [rows] = await connection.query('SELECT * FROM coupon')

//     res.status(200).json({ data: rows })

//     // Release the connection back to the pool
//     connection.release()
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     res.status(500).json({ error: 'Internal Server Error' })
//   }
// }

import React, { useState } from 'react'

export default function Home() {
  let url = 'http://localhost:3005/api/test'
  fetch(url, {
    method: 'GET',
    // body: "",
    // credentials: 'include',
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.error('An error occurred:', err)
    }) /* 如果帳號或密碼錯誤這邊的err會多寫說undefine無法讀取split */

  return (
    <>
      <h1>a</h1>
      <h2>a</h2>
    </>
  )
}
