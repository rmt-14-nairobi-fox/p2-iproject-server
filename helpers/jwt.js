const jwt = require('jsonwebtoken');

function signToken(payload) {
    console.log(payload)
    return jwt.sign(payload, process.env.JWT_SECRET_KEY);
}

module.exports = {
    signToken
}