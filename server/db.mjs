import mysql from 'mysql2/promise'
import 'dotenv/config.js'

const db = await mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  // host: "127.0.0.1",
  // prot: 3306,
  // user: "admin",
  // password: "12345",
  // database: "diving",
  // waitForConnections: true,
  // connectionLimit: 5,
  // queueLimit: 0
})

export default db
