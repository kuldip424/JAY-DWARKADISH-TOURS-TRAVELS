import bcrypt from 'bcryptjs';
import httpError from '../../utils/httpError.js';
import { signToken, verifyToken } from '../../utils/jwt.js';
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserRoleByEmail,
} from '../../repositories/users/users.repository.js';

export const DEFAULT_ADMIN_PASSWORD = 'admin123';

const MIN_PASSWORD_LENGTH = 6;

// Emails are stored lowercase and trimmed, so every lookup uses the same form
const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

// What the client receives after login/register
const toAuthUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: signToken(user._id),
});

export const registerUser = async ({ name, email, password, phone }) => {
  if (!email || !password) throw httpError(400, 'Please provide email and password');
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw httpError(400, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
  }

  const cleanEmail = normalizeEmail(email);
  if (await findUserByEmail(cleanEmail)) throw httpError(400, 'User already exists');

  // A `role` sent by the client is ignored: public sign-ups are always normal users
  // (a duplicate email slipping past the check above is caught by the unique index)
  const user = await createUser({ name, email: cleanEmail, password, phone });
  return toAuthUser(user);
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) throw httpError(400, 'Please provide email and password');

  const user = await findUserByEmail(normalizeEmail(email));
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw httpError(401, 'Invalid email or password');
  }
  return toAuthUser(user);
};

export const getUserProfile = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw httpError(404, 'User not found');
  return user;
};

// Turns an "Authorization: Bearer <token>" header into the logged-in user
export const authenticateToken = async (authHeader = '') => {
  if (!authHeader.startsWith('Bearer ')) throw httpError(401, 'Not authorized, no token');

  let payload;
  try {
    payload = verifyToken(authHeader.slice('Bearer '.length));
  } catch {
    throw httpError(401, 'Not authorized, token failed');
  }

  const user = await findUserById(payload.id);
  if (!user) throw httpError(401, 'Not authorized, user no longer exists');
  return { ...user, id: String(user._id) };
};

// Makes an existing user an admin, or creates a new admin account (used by admin-setup.js)
export const promoteToAdmin = async (rawEmail) => {
  const email = normalizeEmail(rawEmail);
  const existing = await updateUserRoleByEmail(email, 'admin');
  if (existing) return { user: existing, created: false };

  const user = await createUser({ name: 'Admin User', email, password: DEFAULT_ADMIN_PASSWORD, role: 'admin' });
  return { user, created: true };
};
