const { User } = require('../models');
const { verify } = require('../helpers/jwt');

const authentication = async (req, res, next) => {
    let { access_token } = req.headers

    try {
        const { id } = verify(access_token)

        const user = await User.findByPk(id)

        if (!user) {
            throw ({
                name: 'Unauthorized',
                message: 'Your sesssion is over please re-login'
            })
        }
        else {
            req.user = {
                id: user.id
            }

            next()
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    authentication
}