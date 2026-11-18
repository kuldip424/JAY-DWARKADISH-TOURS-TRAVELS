// Admin-only endpoints. Use after protectRoute.
const protectAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(401).json({ success: false, error: 'Not authorized as an admin' });
  }
  next();
};

export default protectAdmin;
