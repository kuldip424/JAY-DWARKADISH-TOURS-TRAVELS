import { getUserProfile, loginUser, registerUser } from '../services/auth/auth.service.js';

// Controllers only read req, call one service and send the answer.
// Anything thrown is handled by middlewares/errorHandler.js.

// POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required' });
  }
  console.log('Registering user:', { name, email });
  const user = await registerUser({ name, email, password });
  console.log('User registered:', user);
  if (!user) {
    return res.status(400).json({ success: false, message: 'User registration failed' });
  }
  res.status(201).json({ success: true, user });
};

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }
  const user = await loginUser({ email, password });
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
  res.json({ success: true, user });
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  const user = await getUserProfile(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.json({ success: true, user });
};
