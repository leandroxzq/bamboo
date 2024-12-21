import express from 'express';
import bcrypt from 'bcrypt';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamboo_db',
});

const dbPromise = db.promise();

app.post('/register', async (req, res) => {
    const { name, email, password, dob, turma } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = 'user';
    const newUser = { name, email, password: hashedPassword, dob, turma, role };

    try {
        await dbPromise.query('INSERT INTO users SET ?', newUser);
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        error.mensage;
        res.status(500).json({ error: 'Erro ao cadastrar o usuário.' });
    }
});

const port = 5000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
