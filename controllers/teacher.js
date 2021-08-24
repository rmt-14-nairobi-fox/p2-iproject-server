const { Teacher } = require('../models');

class TeacherController {
    static async register(req, res, next) {
        const { email, password, name, phoneNumber } = req.body
        try {
            const result = await Teacher.create({
                email, password, name, phoneNumber, role: 'teacher'
            })
            res.status(201).json({ email: result.email, name: result.name })
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {

    }
}

module.exports = TeacherController