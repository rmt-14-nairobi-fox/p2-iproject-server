const {
    User
} = require('../models')

const {
    checkPassword
} = require("../helpers/bcrypt");

const {
    signToken
} = require('../helpers/jwt');

class CustController {
    static async custRegister(req, res, next) {
        try {
            const {
                email,
                phone,
                password
            } = req.body

            const result = await User.create({
                email,
                phone,
                password,
                role: 'customer'
            })

            const {
                id,
                role
            } = result

            const access_token = signToken({
                id,
                email,
                phone,
                role
            })

            res.status(201).json({
                email,
                role,
                access_token
            })

        } catch (err) {
            next(err)
        }
    }

    static async custLogin(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body

            const result = await User.findOne({
                where: {
                    email,
                    role: 'customer'
                }
            })

            if (!result) {
                throw ({
                    name: 'Unauthorized',
                    msg: 'invalid username or email password'
                })
            }

            const {
                id,
                phone,
                role
            } = result

            if (!checkPassword(password, result.password)) {
                throw ({
                    name: 'Unauthorized',
                    msg: 'invalid username or email password'
                })
            }

            const access_token = signToken({
                id,
                email,
                phone,
                role
            })

            res.status(200).json({
                email,
                role,
                access_token
            })

        } catch (err) {
            next(err)
        }
    }
}

module.exports = CustController