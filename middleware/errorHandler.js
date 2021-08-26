function errorHandler(err, req, res, next) {
  let code = null;
  let message = null;
  if (err.name === "SequelizeValidationError") {
    code = 400;
    let dataErr = err.errors.map((el) => {
      return el.message;
    });
    message = { message: dataErr };
  } else if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    message = { message: req.body.email + " already used" };
  } else if (err.name === "UnauthorizedLogin") {
    code = 401;
    message = { message: "email/password invalid" };
  } else if (err.name === "Unauthorized") {
    code = 401;
    message = { message: "Unauthorized" };
  } else if (err.name === "Invalid Token") {
    code = 401;
    message = { message: "Invalid Token" };
  } else if (err.name === "NotFound") {
    code = 404;
    message = { message: "Review not Found" };
  } else if (err.name === "Forbidden Access") {
    code = 403;
    message = { message: "Forbidden Access" };
  } else {
    code = 500;
    message = { message: "Internal Server Error" };
  }
  res.status(code).json(message);
}

module.exports = errorHandler;
