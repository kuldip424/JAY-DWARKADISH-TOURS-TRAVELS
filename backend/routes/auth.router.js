import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { getMe, login, register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protectRoute, getMe);

export default router;
