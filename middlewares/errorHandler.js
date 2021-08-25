const errorHandler = (err, req, res, next) => {
  const name = err.name;
  switch (name) {
    case "SequelizeUniqueConstraintError":
      res.status(401).json({ message: err.errors[0].message });
      break;
    case "InvalidToken":
      res.status(401).json({ message: err.message });
      break;
    case "NotLogin":
      res.status(401).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
};

module.exports = errorHandler;
