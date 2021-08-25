async function errorHandler(err, req, res, next) {
  let code = err.code || 500;
  let message = "Internal server error";

  if (
    err.name === "AccommodationNotFound" ||
    err.name === "SaveNotFound" ||
    err.name === "ImageNotFound"
  ) {
    code = 404;
    message = { message: ["Item/s not found"] };
  } else if (err.name === "SequelizeValidationError") {
    code = 400;
    const errMap = err.errors.map((el) => {
      return el.message;
    });
    message = { message: errMap };
  } else if (err.name === "FileIsBig") {
    code = 400;
    message = { message: ["Image filesize should be less than 255kb"] };
  } else if (err.name === "WrongTypeFile") {
    code = 400;
    message = { message: ["Image type file should be .jpg, .jpeg or .png"] };
  } else if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    message = { message: [`Email is already registered`] };
  } else if (err.name === "UserPasswordError") {
    code = 401;
    message = { message: ["Email / password is wrong"] };
  } else if (err.name === "UserNotFound") {
    code = 404;
    message = { message: ["User not found"] };
  } else if (err.name === "UserVerify") {
    code = 403;
    message = { message: ["Forbidden to access"] };
  } else if (err.name === "NoToken") {
    code = 401;
    message = { message: ["You do not have the access"] };
  }

  console.log(err);
  res.status(code).json(message);
}

module.exports = { errorHandler };
