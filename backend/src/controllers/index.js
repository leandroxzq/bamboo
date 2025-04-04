import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import "dotenv/config"

import { dbPromise } from "../config/connection.js"
const secretKey = process.env.SECRET_KEY

const updateAppointments = async () => {
	const updateQuery = `
		UPDATE appointments
		SET status = 'concluido'
		WHERE status = 'pendente' AND TIMESTAMP(date, time) < NOW();
	`

	await dbPromise.query(updateQuery)
}

export const register = async (req, res) => {
	const { name, email, password, date, room, studentID, cip } = req.body

	const hashedPassword = await bcrypt.hash(password, 10)

	let role = "user"
	if (cip) {
		role = "admin"
	}

	if (email) {
		const [existing] = await dbPromise.query("SELECT * FROM users WHERE email = ?", [email])

		if (existing.length > 0) {
			return res.status(400).json({ message: "Email já cadastrado no sistema." })
		}
	}

	const newUser = {
		name,
		email,
		password: hashedPassword,
		dob: date,
		class: room,
		role,
		studentID: studentID || null,
		cip: cip || null,
	}

	try {
		await dbPromise.query("INSERT INTO users SET ?", newUser)
		res.status(201).json({
			message: `Usuário cadastrado com sucesso!`,
		})
	} catch (e) {
		console.log(e)
		res.status(500).send(e)
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body

	try {
		const [rows] = await dbPromise.query("SELECT * FROM users WHERE email = ?", [email])

		const user = rows[0]

		const passwordMatch = await bcrypt.compare(password, user.password)
		if (!passwordMatch) {
			return res.status(401).json({ error: "Credenciais inválidas." })
		}

		const token = jwt.sign({ id: user.id, role: user.role }, secretKey)

		res.status(200).json({ token, role: user.role })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Erro ao realizar o login." })
	}
}

export const getAvailability = async (req, res) => {
	try {
		await dbPromise.query("DELETE FROM availability WHERE JSON_LENGTH(times) = 0")
		await dbPromise.query(`
            DELETE FROM availability 
            WHERE date < CURDATE()
        `)

		const [rows] = await dbPromise.query("SELECT * FROM availability ORDER BY date, times")

		res.status(200).json({ dates: rows })
	} catch (err) {
		console.error("Erro ao buscar as disponibilidades:", err)
		res.status(500).json({ error: "Erro ao buscar as disponibilidades." })
	}
}

export const configAvailability = async (req, res) => {
	const { date, times } = req.body

	const timesJSON = JSON.stringify(times)

	try {
		const [existing] = await dbPromise.query("SELECT * FROM availability WHERE date = ?", [date])

		if (existing.length > 0) {
			console.error("Data já configurada no sistema.")
			return res.status(400).json({ message: "Data já configurada no sistema." })
		}

		const [result] = await dbPromise.query("INSERT INTO availability (date, times) VALUES (?, ?)", [date, timesJSON])
		res.status(201).json({
			message: "Disponibilidade salva com sucesso",
		})
	} catch (err) {
		console.log(err.message)
		return res.status(500).json({ message: "Erro ao salvar disponibilidade" })
	}
}

export const deleteAllAvaibility = async (req, res) => {
	try {
		const [result] = await dbPromise.query("DELETE FROM availability")
		res.status(200).json({
			message: "Todas as disponibilidades foram removidas.",
		})
	} catch (error) {
		console.error("Erro ao remover disponibilidades:", error)
		res.status(500).json({ error: "Erro ao remover as disponibilidades." })
	}
}

export const schedule = async (req, res) => {
	const { date, time } = req.body
	const userId = req.user.id

	const formattedDate = date.split("T")[0]

	try {
		await dbPromise.query("INSERT INTO appointments (user_id, date, time) VALUES (?, ?, ?)", [userId, date, time])

		const [result] = await dbPromise.query(
			"UPDATE availability SET times = JSON_REMOVE(times, JSON_UNQUOTE(JSON_SEARCH(times, 'one', ?))) WHERE date = ?",
			[time, formattedDate]
		)

		return res.status(200).json({ message: "Agendamento realizado com sucesso!" })
	} catch (e) {
		console.error(e)
	}
}

export const getAppointments = async (req, res) => {
	try {
		await updateAppointments()

		const query = `
            SELECT appointments.*, users.name, users.studentID, users.email, users.dob, users.class
            FROM appointments
            INNER JOIN users ON appointments.user_id = users.id
            ORDER BY appointments.date, appointments.time
        `
		const [appointments] = await dbPromise.query(query)
		res.status(200).json({ appointments })
	} catch (e) {
		console.error("Erro ao buscar agendamentos:", e)
		res.status(500).json({ error: "Erro ao buscar agendamentos." })
	}
}

export const changeAppointments = async (req, res) => {
	const { id } = req.params
	const { status } = req.body

	try {
		const [result] = await dbPromise.query("UPDATE appointments SET status = ? WHERE id = ?", [status, id])

		res.status(200).json({
			message: "Status do agendamento atualizado com sucesso",
		})
	} catch (e) {
		res.status(500).json({
			message: "Erro ao atualizar o agendamento",
			error: e.message,
		})
	}
}

export const createPost = async (req, res) => {
	const { title, text, imageUrl } = req.body

	try {
		await dbPromise.query("INSERT INTO article (title, text_article, directory_img) VALUES (?, ?, ?)", [
			title,
			text,
			imageUrl,
		])

		return res.status(200).json({ title, text, imageUrl })
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Erro interno do servidor." })
	}
}

export const getAllPosts = async (req, res) => {
	try {
		const [list] = await dbPromise.query("SELECT * FROM article ORDER BY id DESC")
		return res.status(200).json(list)
	} catch (e) {
		console.log(e)
		return res.status(500)
	}
}

export const getPost = async (req, res) => {
	try {
		const { id } = req.params
		const [row] = await dbPromise.query("SELECT * FROM article WHERE id = ?;", [id])
		return res.status(200).json(row[0])
	} catch (e) {
		console.error(e)
		return res.status(500).json({ message: "Server error" })
	}
}

export const deletePost = async (req, res) => {
	const { id } = req.params

	try {
		await dbPromise.query("DELETE FROM article WHERE id = ?", [id])

		return res.status(200).json({ message: "Postagem excluída com sucesso" })
	} catch (e) {
		return res.status(500).json({ message: "Erro ao excluir postagem" })
	}
}

export const getProfile = async (req, res) => {
	const userId = req.user.id

	try {
		await updateAppointments()

		const [have] = await dbPromise.query("SELECT * FROM appointments WHERE user_id = ? ", [userId])

		const [data] = await dbPromise.query(
			`SELECT u.name, u.class, u.studentID, u.email, a.date, a.time, a.id, a.status 
             FROM users u
             LEFT JOIN appointments a ON u.id = a.user_id
             WHERE u.id = ?`,
			[userId]
		)

		const user = {
			infos: {
				name: data[0]?.name,
				class: data[0]?.class,
				studentID: data[0]?.studentID,
				email: data[0]?.email,
			},
		}

		if (have.length > 0) {
			user.appointments = data.map((item) => ({
				id: item.id,
				date: item.date,
				time: item.time,
				status: item.status,
			}))
		}
		return res.status(200).json(user)
	} catch (e) {
		console.error(e)
		res.status(500)
	}
}

export const deleteAppointmentsProfile = async (req, res) => {
	const { id } = req.params
	const userId = req.user.id

	const status = "cancelado pelo usuário"

	try {
		const [result] = await dbPromise.query("UPDATE appointments SET status = ? WHERE id = ? AND user_id = ?", [
			status,
			id,
			userId,
		])

		const [appointment] = await dbPromise.query("SELECT date, time FROM appointments WHERE id = ? AND user_id = ?", [
			id,
			userId,
		])

		if (!appointment || appointment.length === 0) {
			return res.status(404).json({ message: "Agendamento não encontrado." })
		}

		const { date, time } = appointment[0]

		const formattedTime = time.split(":").slice(0, 2).join(":")

		const [availability] = await dbPromise.query("SELECT * FROM availability WHERE date = ?", [date])

		if (availability.length === 0) {
			await dbPromise.query("INSERT INTO availability (date, times) VALUES (?, JSON_ARRAY(?))", [date, formattedTime])
		} else {
			const times = availability[0].times
			if (!times.includes(formattedTime)) {
				await dbPromise.query("UPDATE availability SET times = JSON_ARRAY_APPEND(times, '$', ?) WHERE date = ?", [
					formattedTime,
					date,
				])
			} else {
				console.log("O horário já existe na disponibilidade:", time)
			}
		}

		res.status(200).json({
			message: "Status do agendamento atualizado com sucesso",
		})
	} catch (e) {
		res.status(500).json({
			message: "Erro ao atualizar o agendamento",
			error: e.message,
		})
	}
}

export const forgotPassword = async (req, res) => {
	const { email, studentID, newPassword } = req.body

	const [rows] = await dbPromise.query("SELECT * FROM users WHERE email = ? AND studentID = ?", [email, studentID])

	const user = rows[0]

	if (!user) {
		return res.status(404).json({ message: "Usuário não encontrado ou dados incorretos" })
	}

	const hashedPassword = await bcrypt.hash(newPassword, 10)

	await dbPromise.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email])
	res.json({
		message: "Senha alterada com sucesso",
	})
}
