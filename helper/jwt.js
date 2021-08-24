const jwt = require("jsonwebtoken");

function jwtSign(payload) {
  return jwt.sign(payload, "rahasia");
}

function verifToken(token) {
  return jwt.verify(token, "rahasia");
}

module.exports = { jwtSign, verifToken };
