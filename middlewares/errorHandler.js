module.exports = errorHandler = (err, req, res, next) => {
  let code = err.code || 500;
  let msg = { message: "Internal Server Error" };

  if (err.name === "Unauthorized") {
    msg = { message: "invalid user email/password" };
  } else if (err.name === "SequelizeValidationError") {
    code = 400;
    const errors = err.errors.map((e) => e.message);
    msg = { message: errors };
  } else if (err.name === "No Ip") {
    msg = { message: "Failed to get ip" };
  } else if (err.name === "No Nearby Adopted") {
    msg = { message: "Sorry no nearby adopt pet" };
  }
  res.status(code).json(msg);
};
