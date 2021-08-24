const jwt = require("jsonwebtoken")
const jwtSecret = "inisecret"


function signToken(payload) {
    return jwt.sign(payload, jwtSecret)
}

function verifyToken(payload) {
    return jwt.verify(payload, jwtSecret)
}

module.exports = { signToken, verifyToken }