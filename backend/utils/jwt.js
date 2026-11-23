import jwt from 'jsonwebtoken';

// JWT_SECRET must be set: server.js refuses to start without it.
// Read at call time so dotenv has loaded.
const secret = () => process.env.JWT_SECRET;

export const signToken = (userId) => jwt.sign({ id: userId }, secret(), { expiresIn: '30d' });

export const verifyToken = (token) => jwt.verify(token, secret());
