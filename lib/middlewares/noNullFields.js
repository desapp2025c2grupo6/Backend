// Middleware to reject any request body that contains null values
function noNullFields(req, res, next) {
  const body = req.body || {};
  const nullKeys = Object.keys(body).filter((k) => body[k] === null);
  if (nullKeys.length > 0) {
    return res
      .status(400)
      .json({ message: 'Request contains null values', nullKeys });
  }
  next();
}

export default noNullFields;
