import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
})

let sql = "SELECT * FROM user"

pool.execute(sql, (err, res) => {
    if (err)
        throw err

    console.log(res)
})

// module.exports = pool.promise()