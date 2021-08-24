const bcrypt = require('bcrypt')

function hashing(password) {
    return bcrypt.hashSync(password, 10)
}

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashing,
    checkPassword
}