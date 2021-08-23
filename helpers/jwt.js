const jwt = require("jsonwebtoken");

function signToken(data) {
  return jwt.sign(data, process.env.PRIVATE_KEY);
}

function verifyToken(accessToken) {
  return jwt.verify(accessToken, process.env.PRIVATE_KEY);
}

module.exports = { signToken, verifyToken };
