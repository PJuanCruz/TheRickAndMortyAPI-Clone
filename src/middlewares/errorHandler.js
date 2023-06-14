const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || error;

  return res.status(status).json({ error: message });
};

export default errorHandler;
