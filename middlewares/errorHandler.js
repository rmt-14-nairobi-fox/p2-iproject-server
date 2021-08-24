module.exports = errorHandler = (err, req, res, next) => {
  let code = err.code || 500;
  let msg = { message: "Internal Server Error" };

  if (err.name === "Unauthorized") {
    msg = { message: "invalid user email/password" };
  }
  res.status(code).json(msg);
};
