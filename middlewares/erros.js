async function errorHandler(err, req, res, next) {
  let code = err.code || 500;
  let message = "Internal server error";

  if (err.name === "AccommodationNotFound") {
    (code = 404), (message = "Accommodation not found");
  }

  res.status(code).json(message);
}

module.exports = { errorHandler };
