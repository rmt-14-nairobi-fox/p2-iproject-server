const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = (req, res, next) => {
    try {
        const { access_token: accessToken } = req.headers
        if(accessToken) {
            const verified = verifyToken(accessToken)
            User.findByPk(verified.id)
                .then(data => {
                    req.user = {
                        id: data.id,
                        email: data.email,
                        role: data.role
                    }
                    next()
                })
                .catch(err => {
                    throw {name: 'Invalid Token'}
                })
        } else {
            throw { name: 'Please Login First' }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication