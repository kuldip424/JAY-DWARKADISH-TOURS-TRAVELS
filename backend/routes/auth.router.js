import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import rateLimit from '../middlewares/rateLimit.js';
import { getMe, login, register } from '../controllers/auth.controller.js';

const router = express.Router();

// Slows password guessing down: 10 tries per IP every 15 minutes
const authLimit = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

router.post('/register', authLimit, register);
router.post('/login', authLimit, login);
router.get('/me', protectRoute, getMe);

export default router;
