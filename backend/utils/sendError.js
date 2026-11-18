// Sends { success: false, error } with the right HTTP status.
// Unexpected errors are logged and reported as a generic 500, so
// database/internal details never reach the client.
const sendError = (res, e) => {
  let status = e.status;
  if (!status && e.name === 'ValidationError') status = 400; // Mongoose schema rules (required, enum, ...)
  if (!status && e.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Invalid id' });
  }

  if (!status) {
    console.error(e);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
  res.status(status).json({ success: false, error: e.message });
};

export default sendError;
