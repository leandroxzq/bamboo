import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';

import { dbPromise } from '../config/connection.js';

import moment from 'moment';
const now = moment.utc().toISOString();

const secretKey = process.env.SECRET_KEY;

export const register = async (req, res) => {
    const { name, email, password, date, room, studentID, cip } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let role = 'user';
    if (cip) {
        role = 'admin';
    }

    if (email) {
        const [existing] = await dbPromise.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            return res
                .status(400)
                .json({ message: 'Email já cadastrado no sistema.' });
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
    };

    try {
        await dbPromise.query('INSERT INTO users SET ?', newUser);
        res.status(201).json({
            message: `Usuário cadastrado com sucesso!`,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await dbPromise.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
            expiresIn: '12h',
        });

        res.status(200).json({ token, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao realizar o login.' });
    }
};

export const getAvailability = async (req, res) => {
    try {
        await dbPromise.query(
            'DELETE FROM availability WHERE JSON_LENGTH(times) = 0'
        );

        const [rows] = await dbPromise.query(
            'SELECT * FROM availability ORDER BY date, times'
        );

        res.status(200).json({ dates: rows });
    } catch (err) {
        console.error('Erro ao buscar as disponibilidades:', err);
        res.status(500).json({ error: 'Erro ao buscar as disponibilidades.' });
    }
};

export const configAvailability = async (req, res) => {
    const { date, times } = req.body;

    const timesJSON = JSON.stringify(times);

    try {
        const [existing] = await dbPromise.query(
            'SELECT * FROM availability WHERE date = ?',
            [date]
        );

        if (existing.length > 0) {
            console.error('Data já configurada no sistema.');
            return res
                .status(400)
                .json({ message: 'Data já configurada no sistema.' });
        }

        const [result] = await dbPromise.query(
            'INSERT INTO availability (date, times) VALUES (?, ?)',
            [date, timesJSON]
        );
        res.status(201).json({
            message: 'Disponibilidade salva com sucesso',
        });
    } catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json({ message: 'Erro ao salvar disponibilidade' });
    }
};

export const deleteAllAvaibility = async (req, res) => {
    try {
        const [result] = await dbPromise.query('DELETE FROM availability');
        res.status(200).json({
            message: 'Todas as disponibilidades foram removidas.',
        });
    } catch (error) {
        console.error('Erro ao remover disponibilidades:', error);
        res.status(500).json({ error: 'Erro ao remover as disponibilidades.' });
    }
};

export const schedule = async (req, res) => {
    const { date, time } = req.body;
    const userId = req.user.id;
    console.log(userId, date, time);

    try {
        await dbPromise.query(
            'INSERT INTO appointments (user_id, date, time) VALUES (?, ?, ?)',
            [userId, date, time]
        );

        await dbPromise.query(
            "UPDATE availability SET times = JSON_REMOVE(times, JSON_UNQUOTE(JSON_SEARCH(times, 'one', ?))) WHERE date = ?",
            [time, date]
        );

        return res
            .status(200)
            .json({ message: 'Agendamento realizado com sucesso!' });
    } catch (e) {
        console.error(e);
    }
};

export const getAppointments = async (req, res) => {
    try {
        const updateQuery = `
        UPDATE appointments
        SET status = 'concluido'
        WHERE status = 'pendente' AND TIMESTAMP(date, time) < NOW();
    `;
        await dbPromise.query(updateQuery);

        const query = `
            SELECT appointments.*, users.name, users.email, users.dob, users.turma
            FROM appointments
            INNER JOIN users ON appointments.user_id = users.id
            ORDER BY appointments.date, appointments.time
        `;
        const [appointments] = await dbPromise.query(query);
        res.status(200).json({ appointments });
    } catch (e) {
        console.error('Erro ao buscar agendamentos:', e);
        res.status(500).json({ error: 'Erro ao buscar agendamentos.' });
    }
};

export const changeAppointments = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const [result] = await dbPromise.query(
            'UPDATE appointments SET status = ? WHERE id = ?',
            [status, id]
        );

        res.status(200).json({
            message: 'Status do agendamento atualizado com sucesso',
        });
    } catch (e) {
        res.status(500).json({
            message: 'Erro ao atualizar o agendamento',
            error: e.message,
        });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

export const upload = multer({ storage });

export const createPost = async (req, res) => {
    const { title, text } = req.body;
    const file = req.file;

    const directory = `/uploads/${file.filename}`;

    try {
        await dbPromise.query(
            'INSERT INTO article (title, text_article, directory_img, creation_date) VALUES (?, ?, ?, ?)',
            [title, text, directory, now]
        );

        return res.status(200).json({ title, text, directory });
    } catch (e) {
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const [list] = await dbPromise.query(
            'SELECT * FROM article ORDER BY id DESC'
        );
        return res.status(200).json(list);
    } catch (e) {
        console.log(e);
        return res.status(500);
    }
};

export const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const [row] = await dbPromise.query(
            'SELECT * FROM article WHERE id = ?;',
            [id]
        );
        return res.status(200).json(row[0]);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await dbPromise.query(
            'SELECT directory_img FROM article WHERE id = ?',
            [id]
        );

        const path = rows[0].directory_img;

        fs.unlink(`./${path}`, (err) => {
            if (err) throw err;
            console.log('arquivo removido');
        });

        await dbPromise.query('DELETE FROM article WHERE id = ?', [id]);

        return res
            .status(200)
            .json({ message: 'Postagem excluída com sucesso' });
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao excluir postagem' });
    }
};

export const getProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const [data] = await dbPromise.query(
            `SELECT u.name, u.turma, u.email, a.date, a.time, a.id, a.status 
             FROM users u
             LEFT JOIN appointments a ON u.id = a.user_id
             WHERE u.id = ?`,
            [userId]
        );

        const user = {
            name: data[0]?.name,
            turma: data[0]?.turma,
            email: data[0]?.email,
            appointments: data.map((item) => ({
                id: item.id,
                date: item.date,
                time: item.time,
                status: item.status,
            })),
        };

        return res.status(200).json(user);
    } catch (e) {
        console.error(e);
        res.status(500);
    }
};

export const deleteAppointmentsProfile = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const [result] = await dbPromise.query(
            'DELETE FROM appointments WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        res.json({ message: 'deletado com sucesso', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar agendamento' });
    }
};

export const forgotPassword = async (req, res) => {
    const { email, birthdate, newPassword } = req.body;

    const [rows] = await dbPromise.query(
        'SELECT * FROM users WHERE email = ? AND dob = ?',
        [email, birthdate]
    );

    const user = rows[0];

    if (!user) {
        return res
            .status(404)
            .json({ message: 'Usuário não encontrado ou dados incorretos' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await dbPromise.query('UPDATE users SET password = ? WHERE email = ?', [
        hashedPassword,
        email,
    ]);
    res.json({
        message: 'Senha alterada com sucesso',
    });
};
