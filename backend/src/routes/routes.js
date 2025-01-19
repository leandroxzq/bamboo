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

export default router;
