import jwt from 'jsonwebtoken';

const secretKey = 'key';
export function isAuthenticated(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res
            .status(403)
            .json({ message: 'Acesso negado! Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;

        next();
    } catch (error) {
        console.error(`Não logado error: ${error.message}`);
        return res.status(401).json({ message: 'Token inválido ou expirado!' });
    }
}

export function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        console.error('Acesso negado! Somente administradores podem acessar.');
        return res.status(401).json({ message: 'Token inválido ou expirado!' });
    }

    next();
}
