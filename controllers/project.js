const { Project, User } = require('../models');
const { Recruiter, Employee } = require('../helpers/role')

class Controller {
    static async createProject(req, res) {
        try {

            const form = {
                name: req.body.name,
                description: req.body.description,
                imageURL: req.body.imageKit,
                position: req.body.position,
                jobDesc: req.body.jobDesc,
                dueDate: req.body.dueDate,
                UserId: req.userData.id
            }

            const userRecruiter = await User.findOne({
                where: {
                    role: req.userData.role
                }
            });

            if (userRecruiter.role === Recruiter) {
                const create = await Project.create(form);
                res.status(201).json(create)
            } else {
                throw ({ name: 'You cant access ' })
            }

        } catch (err) {
            if (err.name === 'You cant access ') {
                res.status(401).json({
                    msg: 'You cant access '
                })
            } else if (err.name === 'SequelizeValidationError') {
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

    static async addPosition(req, res) {
        try {
            const paramsProject = req.params.id;

            const getProjectById = await Project.findOne({
                where: {
                    id: paramsProject
                }
            })

            const userRecruiter = await User.findOne({
                where: {
                    id: req.userData.id
                }
            })

            if(userRecruiter.role === Recruiter) {
                const form = {
                    name: getProjectById.name,
                    description: getProjectById.description,
                    imageURL: getProjectById.imageURL,
                    position: req.body.position,
                    jobDesc: req.body.jobDesc,
                    dueDate: getProjectById.dueDate,
                    UserId: getProjectById.UserId
                }

                const addingPosition = await Project.create(form);
                res.status(201).json(addingPosition);

            }
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                res.status(400).json({
                    msg: "Bad Request"
                })
            } else {
                res.status(500).json(err);
            }
        }
    }

    static async getAllProject(req, res) {
        try {
            console.log('req.userData: ', req.userData)
            const filterName = req.query.name;
            let allProject;
            if (filterName) {
                allProject = await Project.findAll({
                    where: {
                        name: filterName
                    }
                });
            } else {
                if(req.userData.role === Recruiter) {
                    allProject = await Project.findAll({
                        where: {
                            UserId: req.userData.id
                        }
                    })
                } else if(req.userData.role === Employee) {
                    allProject = await Project.findAll();
                    console.log('allProject: ', allProject)
                }

            }
            res.status(200).json(allProject)

        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async getProject(req, res) {
        try {
            const projectById = await Project.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(projectById);
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async patchProject(req, res) {
        // Tidak bisa pakai form data
        try {

            const form = {
                name: req.body.name,
                description: req.body.description,
                imageURL: req.body.imageKit,
                position: req.body.position,
                jobDesc: req.body.jobDesc,
                dueDate: req.body.dueDate,
                UserId: req.userData.id
            }

            const paramsProject = req.params.id

            const userRecruiter = await User.findOne({
                where: {
                    id: req.userData.id
                }
            })

            if (userRecruiter.role === Recruiter) {
                const getProjectById = await Project.findOne({
                    where: {
                        id: paramsProject
                    }
                })

                const editProject = await Project.update(form, {
                    where: {
                        id: getProjectById.id
                    }
                })
                res.status(200).json(editProject)
            } else {
                throw ({ name: 'You dont have access' })
            }
        } catch (err) {
            if (err.name === 'You dont have access') {
                res.status(404).json({
                    msg: 'You dont have access'
                })
            } else {
                res.status(500).json({
                    msg: `Internal server error`
                })
            }
        }
    }

    static async deleteProject(req, res) {
        try {
            const userRecruiter = await User.findOne({
                where: {
                    id: req.userData.id
                }
            })

            const paramsProject = req.params.id

            if(userRecruiter.role === Recruiter) {

                const getProjectById = await Project.findOne({
                    where: {
                        id: paramsProject
                    }
                })

                if(getProjectById) {
                    const deleteById = await Project.destroy({
                        where: {
                            id: getProjectById.id
                        },
                        returning: true
                    })

                    res.status(200).json(deleteById)
                } else {
                    throw ({name: 'Id Not Found'})
                }
            }
        } catch (err) {
            if(err.name === "Id Not Found") {
                res.status(404).json({
                    msg: 'Id Not Found'
                })
            } else {
                res.status(500).json({
                    msg: 'Internal server error'
                })
            }
        }
    }

    static async getChatRooms(req, res) {
        try {
            const project  = await Project.findOne({
                where: {
                    id: req.params.id
                },
                include: {
                    model: User
                }
            })


            const employee = await User.findOne({
                where: {
                    id: req.userData.id,
                    // role: Employee
                }
            })

            res.status(200).json({
                project,
                employee
            })


        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = Controller