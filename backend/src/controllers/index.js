import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import 'dotenv/config';

import { dbPromise } from '../config/connection.js';

import moment from 'moment';
const now = moment.utc().toISOString();

export const register = async (req, res) => {
    const { name, email, password, dob, turma } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = 'user';
    const newUser = { name, email, password: hashedPassword, dob, turma, role };

    try {
        await dbPromise.query('INSERT INTO users SET ?', newUser);
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const login = async (req, res) => {
    // eslint-disable-next-line no-undef
    const secretKey = process.env.SECRET_KEY;

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

        // eslint-disable-next-line no-unused-vars
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
            affectedRows: result.affectedRows,
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
    const { id } = req.params; // O ID vem dos parâmetros da URL
    const { status } = req.body; // O novo status vem do corpo da requisição

    if (!id || !status) {
        return res.status(400).json({ message: 'ID e status são necessários' });
    }

    try {
        const [result] = await dbPromise.query(
            'UPDATE appointments SET status = ? WHERE id = ?',
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res
                .status(404)
                .json({ message: 'Agendamento não encontrado' });
        }

        res.status(200).json({
            message: 'Status do agendamento atualizado com sucesso',
        });
    } catch (error) {
        console.error('Erro ao atualizar o agendamento:', error);
        res.status(500).json({
            message: 'Erro ao atualizar o agendamento',
            error: error.message,
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
        console.error('Erro ao salvar no banco de dados:', e);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const getPosts = async (req, res) => {
    try {
        const [list] = await dbPromise.query('SELECT * FROM article');
        console.log(list);
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
        await dbPromise.query('DELETE FROM article WHERE id = ?', [id]);

        return res
            .status(200)
            .json({ message: 'Postagem excluída com sucesso' });
    } catch (e) {
        console.error('Erro ao excluir o post:', e);
        return res.status(500).json({ message: 'Erro ao excluir postagem' });
    }
};
