/* eslint-disable no-undef */
import mysql from "mysql2"
import "dotenv/config"

const db = mysql.createConnection({
	host: process.env.BD_HOST,
	user: process.env.BD_USER,
	password: process.env.BD_PASSWORD,
	database: process.env.BD_NAME,
	timezone: "-03:00",
})

const dbPromise = db.promise()

export { dbPromise }
