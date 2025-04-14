import mysql from "mysql2/promise"
import "dotenv/config"

const dbPromise = mysql.createPool({
	host: process.env.BD_HOST,
	user: process.env.BD_USER,
	password: process.env.BD_PASSWORD,
	database: process.env.BD_NAME,
	timezone: "-03:00",
	connectionLimit: 10,
})

export { dbPromise }
