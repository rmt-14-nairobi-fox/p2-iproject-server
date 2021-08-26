const jwt = require('jsonwebtoken')

function generateToken(data) {
  return jwt.sign(data, process.env.JWT_KEY)
}

function decodeToken(token) {
  return jwt.verify(token, process.env.JWT_KEY)
}

module.exports = {generateToken, decodeToken}