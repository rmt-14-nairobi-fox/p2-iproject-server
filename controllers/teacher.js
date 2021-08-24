const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const getPredikat = require('../helpers/predikat');
const { Teacher, Class, StudentClass, Student } = require('../models');

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
    static async getClass(req, res, next) {
        const { id } = req.user
        try {
            const result = await Class.findAll({
                where: {
                    TeacherId: id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async getStudentClass(req, res, next) {
        const { idClass } = req.params
        const idTeacher = req.user.id
        try {
            const classes = await Class.findByPk(idClass)
            if (classes) {
                const result = await StudentClass.findAll({
                    where: {
                        ClassId: idClass,
                        TeacherId: idTeacher,
                        status: 'accepted'
                    }
                })
                res.status(200).json(result)
            } else {
                throw { name: 'Not Found' }
            }
        } catch (err) {
            next(err)
        }
    }
    static async getStudentWaiting(req, res, next) {
        const { idClass } = req.params
        const idTeacher = req.user.id
        try {
            const classes = await Class.findByPk(idClass)
            if (classes) {
                const result = await StudentClass.findAll({
                    where: {
                        ClassId: idClass,
                        TeacherId: idTeacher,
                        status: 'waiting'
                    }
                })
                res.status(200).json(result)
            } else {
                throw { name: 'Not Found' }
            }
        } catch (err) {
            next(err)
        }
    }
    static async addClass(req, res, next) {
        const { name } = req.body
        const { id } = req.user
        try {
            const result = await Class.create({
                TeacherId: id,
                name
            })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async acceptStudent(req, res, next) {
        const { idClass, idStudent } = req.params
        try {
            const result = await StudentClass.findOne({
                where: {
                    ClassId: idClass,
                    StudentId: idStudent
                },
                include: {
                    model: Student,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                },
            })
            if (result) {
                await StudentClass.update({ status: 'accepted' }, {
                    where: {
                        ClassId: idClass,
                        StudentId: idStudent
                    }
                })
                res.status(200).json({ message: `${result.Student.name} has been accepted in your class` })
            } else {
                throw { name: 'Not Found' }
            }
        } catch (err) {
            next(err)
        }
    }
    static async rejectStudent(req, res, next) {
        const { idClass, idStudent } = req.params
        try {
            const result = await StudentClass.findOne({
                where: {
                    ClassId: idClass,
                    StudentId: idStudent
                },
                include: {
                    model: Student,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                },
            })
            if (result) {
                await StudentClass.update({ status: 'rejected' }, {
                    where: {
                        ClassId: idClass,
                        StudentId: idStudent
                    }
                })
                res.status(200).json({ message: `${result.Student.name} has been rejected from your class` })
            } else {
                throw { name: 'Not Found' }
            }
        } catch (err) {
            next(err)
        }
    }
    static async deleteStudent(req, res, next) {
        const { idClass, idStudent } = req.params
        try {
            const result = await StudentClass.findOne({
                where: {
                    ClassId: idClass,
                    StudentId: idStudent
                }
            })
            if (result) {
                await StudentClass.destroy({ where: { id: result.id } })
                res.status(200).json({ message: 'Student has been deleted from your class' })
            } else {
                throw { name: 'Not Found' }
            }
        } catch (err) {
            next(err)
        }
    }
    static async updateScore(req, res, next) {
        const { idClass, idStudent } = req.params
        const { score1, score2, score3, score4, score5, note } = req.body
        try {
            const result = await StudentClass.findOne({
                where: {
                    ClassId: idClass,
                    StudentId: idStudent
                },
                include: {
                    model: Student,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                },
            })
            if (result) {
                const totalScore = score1 + score2 + score3 + score4 + score5
                const predikat = getPredikat(totalScore)
                await StudentClass.update({ score1, score2, score3, score4, score5, totalScore, predikat, note }, {
                    where: {
                        id: result.id
                    }
                })
                res.status(200).json({ message: `Score from ${result.Student.name} has been updated` })
            } else {
                throw { name: 'Not Found' }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TeacherController