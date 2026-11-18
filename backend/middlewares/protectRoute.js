import { authenticateToken } from '../services/auth/auth.service.js';
import sendError from '../utils/sendError.js';

// Requires "Authorization: Bearer <token>" and puts the logged-in user on req.user
const protectRoute = async (req, res, next) => {
  try {
    req.user = await authenticateToken(req.headers.authorization);
  } catch (e) {
    return sendError(res, e);
  }
  next();
};

export default protectRoute;
