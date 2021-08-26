const { User } = require('../models');
const { comparePass } = require('../helpers/bcrypt');
const { sign } = require('../helpers/jwt');

class UserController {
    static async register(req, res, next) {
        let { email, password, username } = req.body

        try {
            const user = await User.create({
                email,
                password,
                username
            })
            
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        let { email, password } = req.body

        try {
            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw ({
                    name: 'Unauthorized',
                    message: 'Invalid email or password'
                })
            }
            else {
                if (!comparePass(password, user.password)) {
                    throw ({
                        name: 'Unauthorized',
                        message: 'Invalid email or password'                        
                    })
                }
                else {
                    let access_token = sign({
                        id: user.id,
                        email: user.email
                    })

                    res.status(200).json({
                        access_token,
                        username: user.username
                    })
                }
            }
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = UserController