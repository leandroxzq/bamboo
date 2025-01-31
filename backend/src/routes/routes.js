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
    changeAppointments,
    createPost,
    upload,
    getAllPosts,
    getPost,
    deletePost,
    getProfile,
    deleteAppointmentsProfile,
    forgotPassword,
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

router.put('/scheduled/:id', isAuthenticated, isAdmin, changeAppointments);

// post

router.post(
    '/upload',
    isAuthenticated,
    isAdmin,
    upload.single('imagem'),
    createPost
);

router.get('/posts', getAllPosts);

router.get('/post/:id', getPost);

router.delete('/delete/:id', isAuthenticated, isAdmin, deletePost);

// profile

router.get('/profile', isAuthenticated, getProfile);

router.delete('/appointments/:id', isAuthenticated, deleteAppointmentsProfile);

// password

router.post('/forgot-password', forgotPassword);

// Servir os arquivos estáticos da pasta de uploads
router.use('/uploads', express.static('uploads'));

export default router;
