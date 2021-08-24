const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
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
        const { email, password } = req.body
        try {
            const teacher = await Teacher.findOne({ where: { email } })
            if (teacher) {
                if (comparePassword(password, teacher.password)) {
                    const access_token = signToken({
                        id: teacher.id,
                        email: teacher.email,
                        role: teacher.role
                    })
                    res.status(200).json({ access_token })
                } else {
                    throw { name: 'Wrong Email/Password' }
                }
            } else {
                throw { name: 'Wrong Email/Password' }
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async addClass(req, res, next) {
        const { name } = req.body
        const { id } = req.user
    }
}

module.exports = TeacherController