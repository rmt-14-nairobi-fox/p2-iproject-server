const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET);
  return token;
};

const verify = (token) => {
  const decode = jwt.verify(token, process.env.SECRET);
  return decode;
};

module.exports = {
  generateToken,
  verify,
};
