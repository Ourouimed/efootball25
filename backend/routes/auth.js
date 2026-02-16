import express from 'express';
import { login, logout, verifySession } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/verify-session', verifySession);
router.delete('/logout', logout);

export default router;
