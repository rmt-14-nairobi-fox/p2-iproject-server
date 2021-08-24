function errorHandler(err, req, res, next) {
  let code;
  let message;
  let errors;

  switch (err.name) {
    case "NotFound":
      message = "Data Not Found";
      code = 404;
      break;

    case "SequelizeValidationError":
      errors = err.errors.map((err) => {
        if (err.message === "User.password cannot be null") {
          err.message = "password is required";
        }
        if (err.message === "User.email cannot be null") {
          err.message = "email is required";
        }
        return err.message;
      });
      message = errors;
      code = 400;
      break;

    case "SequelizeUniqueConstraintError":
      errors = err.errors.map((err) => {
        return err.message;
      });
      message = errors;
      code = 400;
      break;

    case "FailedLogin":
      message = "Email/password invalid";
      code = 401;
      break;

    case "SequelizeForeignKeyConstraintError":
      message = "Data Not Found";
      code = 404;
      break;

    case "JsonWebTokenError":
      message = "You must Log In first!";
      code = 401;
      break;

    case "Forbidden":
      message = "Forbidden to Access";
      code = 403;
      break;

    default:
      (code = 500), (message = `Internal server error`);
      break;
  }

  res.status(code).json(message);
}

module.exports = errorHandler;
