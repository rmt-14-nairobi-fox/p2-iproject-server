const errorHandler = (err, req, res, next) => {
  console.log(err);
  const name = err.name;
  switch (name) {
    case "SequelizeUniqueConstraintError":
      res.status(401).json({ message: err.errors[0].message });
      break;
    case "SequelizeValidationError":
      res.status(401).json({ message: err.errors[0].message });
      break;
    case "SequelizeDatabaseError":
      res.status(401).json({ message: err.errors[0].message });
      break;
    case "InvalidToken":
      res.status(401).json({ message: err.message });
      break;
    case "NotLogin":
      res.status(401).json({ message: err.message });
      break;
    case "InvalidWord":
      res.status(400).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
};

module.exports = errorHandler;
