const jwt = require('jsonwebtoken');

const sign = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET)
}

const verify = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    sign,
    verify
}