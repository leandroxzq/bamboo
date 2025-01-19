import express from 'express';

import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import {
    register,
    login,
    getAvailability,
    configAvailability,
    deleteAllAvaibility,
    schedule,
    getAppointments,
    deleteAllAppointments,
    createPost,
    upload,
    getPost,
} from '../controllers/index.js';

const router = express.Router();

// auth

router.post('/register', register);

router.post('/login', login);

// availability

router.get('/availability', getAvailability);

router.post('/availability', isAuthenticated, configAvailability);

router.delete('/availability', isAuthenticated, isAdmin, deleteAllAvaibility);

// appointments

router.post('/appointment', isAuthenticated, schedule);

// scheduled

router.get('/scheduled', isAuthenticated, isAdmin, getAppointments);

router.delete('/scheduled', isAuthenticated, isAdmin, deleteAllAppointments);

// post

router.post('/upload', upload.single('imagem'), createPost);

router.get('/posts', getPost);

// Servir os arquivos estáticos da pasta de uploads
router.use('/uploads', express.static('uploads'));

export default router;
