const notFound = (req, res, next) => {
  const error = new Error();
  error.status = 400;
  error.message = 'There is nothing here.';
  next(error);
};

export default notFound;
