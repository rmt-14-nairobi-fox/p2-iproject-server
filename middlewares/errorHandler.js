module.exports = function (err, req, res, next) {
  const defaultMsg = {
    message: 'Internal Server Error',
  };

  if (res.headersSent) {
    return next(err);
  }

  if (err.name === 'SequelizeValidationError') {
    err = err.errors.map((error) => {
      return {
        message: error.message,
      };
    });

    res.status(400).json(err);
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      message: 'Email already exists',
    });
  } else if (err.name === 'Not Found') {
    res.status(404).json({
      message: err.message,
    });
  } else if (err.name === 'Unauthorized') {
    res.status(401).json({
      message: err.message,
    });
  } else if (err.name === 'Forbidden') {
    res.status(403).json({
      message: err.message,
    });
  } else {
    res.status(500).json(defaultMsg);
  }
};
