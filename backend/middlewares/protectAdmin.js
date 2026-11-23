import httpError from '../utils/httpError.js';

// Admin-only endpoints. Use after protectRoute.
// 403, not 401: the user is logged in, they are just not an admin.
const protectAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return next(httpError(403, 'Not authorized as an admin'));
  next();
};

export default protectAdmin;
