// Last middleware in server.js: turns any thrown error into
// { success: false, error }. Services throw httpError(status, msg);
// anything else is logged and reported as a generic 500, so database
// and internal details never reach the client.
const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.status) {
    return res.status(err.status).json({ success: false, error: err.message });
  }
  if (err.code === 11000) { // a unique index (user email, place slug) was hit twice
    return res.status(400).json({ success: false, error: 'That record already exists' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, error: err.message }); // required, enum, ...
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Invalid id' });
  }

  console.error(err);
  res.status(500).json({ success: false, error: 'Server error' });
};

export default errorHandler;
