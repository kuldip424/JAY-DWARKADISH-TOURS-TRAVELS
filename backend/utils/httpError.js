// Throw from services so controllers can map the error to an HTTP status.
const httpError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

export default httpError;
