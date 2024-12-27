import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { db, dbPromise } from '../config/connection.js';
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
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao cadastrar o usuário.' });
    }
});

router.post('/login', async (req, res) => {
    const secretKey = 'key';

    const { email, password } = req.body;

    try {
        const [rows] = await dbPromise.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

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

router.get('/availability', (req, res) => {
    const query = 'SELECT * FROM availability ORDER BY date, times';
    db.query(query, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar as disponibilidades:', err);
            return res
                .status(500)
                .json({ error: 'Erro ao buscar as disponibilidades.' });
        }

        res.status(200).json({ dates: rows });
    });
});

router.post('/availability', isAuthenticated, isAdmin, async (req, res) => {
    const { date, times } = req.body;

    console.log('Data recebida:', date);
    console.log('Horários recebidos:', times);

    const timesJSON = JSON.stringify(times);

    try {
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

router.delete('/availability', async (req, res) => {
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

export default router;
