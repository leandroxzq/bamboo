import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

import { dbPromise } from '../config/connection.js';
import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
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
});

router.post('/login', async (req, res) => {
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
});

router.post('/create-admin', async (req, res) => {
    const { name, email, password, dob, turma } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const role = 'admin';

        const newAdmin = {
            name,
            email,
            password: hashedPassword,
            dob,
            turma,
            role,
        };

        await dbPromise.query('INSERT INTO users SET ?', newAdmin);

        res.status(201).json({ message: 'Admin criado com sucesso!' });
    } catch (error) {
        res.status(500).json(`Erro ao criar o admin ${error.message}`);
    }
});

router.get('/availability', async (req, res) => {
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
});

router.post('/availability', isAuthenticated, isAdmin, async (req, res) => {
    const { date, times } = req.body;

    console.log('Data recebida:', date);
    console.log('Horários recebidos:', times);

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
                .json({ message: 'Disponibilidade salva com sucesso' });
        }

        const [result] = await dbPromise.query(
            'INSERT INTO availability (date, times) VALUES (?, ?)',
            [date, timesJSON]
        );
        console.log('Disponibilidade salva com sucesso:', result);
        res.status(201).json({ message: 'Disponibilidade salva com sucesso' });
    } catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json({ message: 'Erro ao salvar disponibilidade' });
    }
});

router.delete('/availability', isAuthenticated, isAdmin, async (req, res) => {
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
});

router.get('/appointments', async (req, res) => {
    try {
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
});

router.delete('/appointments', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const result = await dbPromise.query('DELETE FROM appointments');

        if (result.affectedRows > 0) {
            return res.status(200).json({
                message: 'Todos os agendamentos foram deletados com sucesso!',
            });
        } else {
            return res.status(404).json({
                message: 'Nenhum agendamento encontrado para deletar.',
            });
        }
    } catch (error) {
        console.error('Erro ao deletar os agendamentos:', error);
        return res
            .status(500)
            .json({ message: 'Erro ao deletar os agendamentos.' });
    }
});

router.post('/schedule', isAuthenticated, async (req, res) => {
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
});

export default router;
