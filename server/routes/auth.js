import express from 'express';
import { loginUser, logoutUser, getCurrentUser } from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Auth routes
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getCurrentUser);

export default router;