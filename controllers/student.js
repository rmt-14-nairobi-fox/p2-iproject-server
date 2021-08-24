const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { Student } = require('../models');

class StudentController {
    static async register(req, res, next) {
        const { email, password, name, phoneNumber } = req.body
        try {
            const result = await Student.create({
                email, password, name, phoneNumber, role: 'student'
            })
            res.status(201).json({ email: result.email, name: result.name })
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            const student = await Student.findOne({ where: { email } })
            if (student) {
                if (comparePassword(password, student.password)) {
                    const access_token = signToken({
                        id: student.id,
                        email: student.email,
                        role: student.role
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
    static async joinClass(req, res, next) {
        const idClass = req.params.id
        const idStudent = req.user.id
    }
}

module.exports = StudentController