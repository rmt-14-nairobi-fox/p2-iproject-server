const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const genPass = (plainPass) => {
  return bcrypt.hashSync(plainPass, 8);
};

const checkPass = (plainPass, hashedPass) => {
  return bcrypt.compareSync(plainPass, hashedPass);
};

const signToken = (payload) => {
  return jwt.sign(payload, "secret");
};

const verifyToken = (token) => {
  return jwt.verify(token, "secret");
};

module.exports = { signToken, verifyToken, genPass, checkPass };
