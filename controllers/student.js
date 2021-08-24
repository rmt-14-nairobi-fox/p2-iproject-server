const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { Teacher, Student, Class, StudentClass } = require('../models');

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
    static async getClass(req, res, next) {
        try {
            const result = await Class.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Teacher,
                    attributes: {
                        exclude: ['password', 'role', 'createdAt', 'updatedAt']
                    }
                }
            })
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async getMyClass(req, res, next) {
        const { id } = req.user
        try {
            const result = await StudentClass.findAll({
                where: {
                    StudentId: id,
                    status: 'accepted'
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'score1', 'score2', 'score3', 'score4', 'score5', 'totalScore', 'predikat', 'status']
                },
                include: {
                    model: Class,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: {
                        model: Teacher,
                        attributes: {
                            exclude: ['password', 'role', 'createdAt', 'updatedAt']
                        }
                    }
                }
            })
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async getWaitingClass(req, res, next) {
        const { id } = req.user
        try {
            const result = await StudentClass.findAll({
                where: {
                    StudentId: id,
                    status: 'waiting'
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'score1', 'score2', 'score3', 'score4', 'score5', 'totalScore', 'predikat', 'status', 'note']
                },
                include: {
                    model: Class,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: {
                        model: Teacher,
                        attributes: {
                            exclude: ['password', 'role', 'createdAt', 'updatedAt']
                        }
                    }
                }
            })
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async joinClass(req, res, next) {
        const idClass = req.params.id
        const idStudent = req.user.id
        try {
            const result = await Class.findByPk(idClass)
            if (result) {
                const newStudentClass = {
                    ClassId: idClass,
                    StudentId: idStudent,
                    score1: 0,
                    score2: 0,
                    score3: 0,
                    score4: 0,
                    score5: 0,
                    totalScore: 0,
                    predikat: '-',
                    status: 'waiting'
                }
                await StudentClass.create(newStudentClass)
                res.status(201).json({ message: 'Success join class' })
            } else {
                throw { name: 'Not Found' }
            }
        } catch (err) {
            next(err)
        }
    }
    static async getMyScore(req, res, next) {
        const { idClass } = req.params
        const idStudent = req.user.id
        try {
            const classes = await Class.findByPk(idClass)
            if (classes) {
                const result = await StudentClass.findOne({
                    where: {
                        ClassId: idClass,
                        StudentId: idStudent
                    },
                    include: {
                        model: Class,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        include: {
                            model: Teacher,
                            attributes: {
                                exclude: ['password', 'role', 'createdAt', 'updatedAt']
                            }
                        }
                    }
                })
                if (result) {
                    res.status(200).json(result)
                } else {
                    throw { name: 'Not Found' }
                }
            } else {
                throw { name: 'Not Found' }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = StudentController