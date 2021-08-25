const { User } = require('../models');

class UserController {
    static async register(req, res, next) {
        let { email, password, username } = req.body
        console.log(email, password);

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
}

module.exports = UserController