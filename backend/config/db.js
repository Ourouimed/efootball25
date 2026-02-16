import { config } from 'dotenv'
import mysql from 'mysql2/promise'
if (process.env.NODE_ENV !== 'production') {
  config()
}
const pool = mysql.createPool({
    database : process.env.DB_NAME,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    connectionLimit : 10,
    waitForConnections: true,
    timezone: 'Z'
})

export default pool