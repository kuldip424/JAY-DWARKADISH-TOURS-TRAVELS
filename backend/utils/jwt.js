import jwt from 'jsonwebtoken';

// Read at call time so dotenv has loaded. Set JWT_SECRET in production:
// the fallback is only meant for local development.
const secret = () => process.env.JWT_SECRET || 'secret123';

export const signToken = (userId) => jwt.sign({ id: userId }, secret(), { expiresIn: '30d' });

export const verifyToken = (token) => jwt.verify(token, secret());
