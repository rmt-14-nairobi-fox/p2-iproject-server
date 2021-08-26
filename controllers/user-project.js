const { UserProject, Project, User } = require('../models');
const { Employee, Recruiter } = require('../helpers/role');
const { Pending, Rejected, Accepted } = require('../helpers/status');

class Controller {
    static async applyProject(req, res) {
        try {
            const paramsId = req.params.projectId
            const getProject = await Project.findOne({
                where: {
                    id: paramsId
                }
            })

            // console.log(getProject)
            const userApply = await User.findOne({
                where: {
                    id: req.userData.id
                }
            })

            if (userApply.role === Employee) {
                const allUserProject = await UserProject.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                });
                const apply = await UserProject.create({
                    id: allUserProject.length ? allUserProject[allUserProject.length - 1].id + 1 : 1,
                    UserId: userApply.id,
                    ProjectId: getProject.id,
                    status: Pending
                })
                res.status(201).json(apply)
            } else {
                throw ({ name: 'You cant access' })
            }

        } catch (err) {
            if (err.name === 'You cant access') {
                res.status(401).json({
                    msg: err.name
                })
            } else {
                // res.send(err)
                // console.log(err)
                res.status(500).json({
                    msg: 'Internal Server Error'
                })
            }
        }
    }

    static async getUserProject(req, res) {
        try {
            const paramsUser = req.params.userId
            // console.log(paramsUser)
            const userEmployee = await User.findOne({
                where: {
                    id: paramsUser
                }
            })

            if (userEmployee.role === Employee) {
                const getProject = await UserProject.findAll({
                    where: {
                        UserId: userEmployee.id
                    }
                });
                res.status(200).json(getProject)
            } else {
                throw ({ name: 'You cant access' })
            }
        } catch (err) {
            if (err.name === 'You cant access') {
                res.status(403).json({
                    msg: 'You cant access'
                })
            } else {
                res.status(500).json({
                    msg: 'Internal server error'
                })
            }
        }
    }

    static async statusJob(req, res) {
        try {
            const paramsProject = req.params.id
            const getApplyEmployee = await UserProject.findAll({
                where: {
                    id: paramsProject
                },
                include: {
                    model: Project
                }
            })

            const getProject = await Project.findAll({
                where: {
                    UserId: req.userData.id
                }
            })
            if (req.userData.role === Recruiter) {
                if (getApplyEmployee[0].Project.UserId === getProject[0].UserId) {
                    let updateStatus
                    if (req.body.status === Accepted) {
                        updateStatus = await UserProject.update({
                            status: Accepted
                        }, {
                            where: {
                                id: getApplyEmployee[0].id
                            },
                            returning: true
                        })
                    } else if (req.body.status === Rejected) {
                        updateStatus = await UserProject.update({
                            status: Rejected
                        }, {
                            where: {
                                id: getApplyEmployee[0].id
                            },
                            returning: true
                        })
                    }
                    res.status(200).json(updateStatus[1][0]);
                }
            }
        } catch (err) {
            // console.log(err);
            res.status(500).json(err)
        }
    }

    static async getApplyProject(req, res) {
        try {
            if (req.userData.role === Recruiter) {
                const getProject = await Project.findAll({
                    where: {
                        UserId: req.userData.id
                    }
                })

                // console.log(getProject)
                const applyProject = await UserProject.findAll({
                    include: {
                        model: Project
                    }
                })
                if (getProject[0].UserId === applyProject[0].Project.UserId) {
                    const getProjectByUserId = await UserProject.findAll({
                        include: [
                            {
                                model: User,
                            },
                            {
                                model: Project
                            }
                        ],
                        where: {
                            status: Pending
                        }
                    })
                    res.status(200).json(getProjectByUserId)
                }
            } else {
                throw ({ name: `Forbidden Access` })
            }
        } catch (err) {
            if (err.name === `Forbidden Access`) {
                res.status(403).json({
                    msg: err.name
                })
            } else {
                res.status(500).json({
                    msg: 'Internal Server Error'
                })
            }
        }
    }

    static async getEmployeeAccepted(req, res) {
        try {
            const userRecruiter = await User.findOne({
                where: {
                    id: req.userData.id
                }
            })

            if (userRecruiter.role === Recruiter) {
                const getUserProject = await UserProject.findAll({
                    include: {
                        model: Project
                    }
                })

                if (getUserProject[0].Project.UserId === userRecruiter.id) {
                    const getAccepted = await UserProject.findAll({
                        where: {
                            status: Accepted
                        },
                    })

                    res.status(200).json(getAccepted)
                }
            } else {
                throw ({ name: 'Forbidden access' })
            }
        } catch (err) {
            if (err.name === 'Forbidden access') {
                res.status(403).json({
                    msg: err.name
                })
            } else {
                res.status(500).json({
                    msg: 'Internal Server Error'
                })
            }
        }
    }

    static async groupAccepted(req, res) {
        try {
            const userRecruiter = await User.findOne({
                where: {
                    id: req.userData.id
                }
            })

            if (userRecruiter.role === Recruiter) {
                const getUserProject = await UserProject.findAll({
                    include: {
                        model: Project
                    }
                })

                if (getUserProject[0].Project.UserId === userRecruiter.id) {
                    const getAccepted = await UserProject.findAll({
                        where: {
                            status: Accepted
                        },
                        include: {
                            model: Project
                        }
                    })

                    if (getAccepted) {

                        const projectByname = await Project.findAndCountAll({
                            where: {
                                name: req.params.name
                            }
                        })
                        res.status(200).json(projectByname)
                    }

                }
            } else {
                throw ({ name: 'Forbidden access' })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = Controller