const bcrypt = require('bcrypt');

const hashPass = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

const comparePass = (password, hashedPass) => {
    return bcrypt.compareSync(password, hashedPass)
}

module.exports = {
    hashPass,
    comparePass
}