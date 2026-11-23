import httpError from '../utils/httpError.js';

// Counts requests per IP in memory. Enough for a single server;
// if the API is ever run on several instances, move this to Redis.
const hits = new Map();

const dropExpired = (now) => {
  for (const [key, entry] of hits) if (now > entry.resetAt) hits.delete(key);
};

const rateLimit = ({ windowMs = 15 * 60 * 1000, max = 10 } = {}) => (req, res, next) => {
  const now = Date.now();
  if (hits.size > 5000) dropExpired(now); // keep the map from growing forever

  const entry = hits.get(req.ip);
  if (!entry || now > entry.resetAt) {
    hits.set(req.ip, { count: 1, resetAt: now + windowMs });
    return next();
  }

  entry.count += 1;
  if (entry.count > max) return next(httpError(429, 'Too many attempts. Please try again later.'));
  next();
};

export default rateLimit;
