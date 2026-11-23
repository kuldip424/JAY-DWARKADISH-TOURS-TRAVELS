import { authenticateToken } from '../services/auth/auth.service.js';

// Requires "Authorization: Bearer <token>" and puts the logged-in user on req.user
const protectRoute = async (req, res, next) => {
  try {
    req.user = await authenticateToken(req.headers.authorization);
    next();
  } catch (e) {
    next(e);
  }
};

export default protectRoute;
