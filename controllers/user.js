const { User } = require('../models');
const { Employee, Recruiter } = require('../helpers/role');
const { checkPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const githubAPI = require('github-oauth-express');
const app = require('../server');

class Controller {
    static async recruiterRegister(req, res) {
        try {
            const form = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                role: Recruiter
            }
            const createUser = await User.create(form)
            if (createUser) {
                const token = signToken({ id: createUser.id, email: createUser.email, role: createUser.role })
                res.status(201).json(token);
            }
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                // const errors = [];
                let message;
                message = err.errors.map((el) => {
                    return el.message
                })

                res.status(400).json({
                    msg: message
                })
            } else {
                res.status(500).json(err)
            }
        }
    }

    static async recruiterLogin(req, res) {
        try {
            const form = {
                email: req.body.email,
                password: req.body.password
            }
            const findUser = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            const matchPassword = checkPassword(form.password, findUser.password);

            if (findUser.role === Recruiter) {
                if (matchPassword) {
                    console.log("MASUK")
                    const token = signToken({ id: findUser.id, email: findUser.email, role: findUser.role }, process.env.JWT_SECRET_KEY);

                    res.status(200).json(token)
                } else {
                    throw ({ name: 'Unauthorized' })
                }
            } else {
                throw ({ name: 'You cant access' })
            }

        } catch (err) {
            // console.log(err)
            if (err.name === 'Unauthorized') {
                res.status(401).json({
                    msg: err.name
                })
            } else if (err.name === 'You cant access') {
                res.status(403).json({
                    msg: err.name
                })
            } else {
                res.status(500).json({
                    msg: 'Internal server error'
                })
            }
        }
    }

    static async registerEmployee(req, res) {
        try {
            const form = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                role: Employee
            }

            const createEmployee = await User.create(form);
            res.status(201).json(createEmployee);
        } catch (err) {
            // console.log(err)
            if (err.name === 'SequelizeValidationError') {
                let message;
                message = err.errors.map((el) => {
                    return el.message
                })

                res.status(400).json({
                    msg: message
                })
            } else {
                res.status(500).json(err)
            }
        }
    }

    static async LoginEmployee(req, res) {
        try {
            const form = {
                email: req.body.email,
                password: req.body.password
            }

            const findUser = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            if (findUser.role === Employee) {
                const matchPassword = checkPassword(form.password, findUser.password);

                if (matchPassword) {
                    const token = signToken({ id: findUser.id, email: findUser.email, role: findUser.role });

                    res.status(200).json(token);
                } else {
                    throw ({ name: 'Unauthorized' })
                }
            } else {
                throw ({ name: 'You cant access' })
            }

        } catch (err) {
            if (err.name === 'Unauthorized') {
                res.status(401).json(err.name)
            } else if (err.name === 'You cant access') {
                res.status(403).json(err.name)
            } else {
                res.status(500).json(err)
            }
        }
    }

    static async authGithub(req, res) {
        try {
            const form = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                role: Employee
            }
            const createUser = await User.findOrCreate({
                where: form
            })
            if (createUser) {
                const token = signToken({ id: createUser.id, email: form.email, role: form.role })
                res.status(201).json(token);
            }
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                // const errors = [];
                let message;
                message = err.errors.map((el) => {
                    return el.message
                })

                res.status(400).json({
                    msg: message
                })
            } else {
                // res.status(500).json(err)
                console.log(err)
            }
        }
    }

}

module.exports = Controller