import { getUserProfile, loginUser, registerUser } from '../services/auth/auth.service.js';
import sendError from '../utils/sendError.js';

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body || {});
    res.status(201).json({ success: true, user });
  } catch (e) {
    sendError(res, e);
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body || {});
    res.json({ success: true, user });
  } catch (e) {
    sendError(res, e);
  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.id);
    res.json({ success: true, user });
  } catch (e) {
    sendError(res, e);
  }
};
