const {
    readAllFarmOpt
} = require('../helpers/optionsHelper');
const {
    Farm,
    Type,
    User,
    Form
} = require('../models')

class FarmController {
    static async createFarm(req, res, next) {
        try {
            const imgUrl = req.imgUrl

            const {
                id,
            } = req.user


            const {
                name,
                description,
                location,
                area,
                TypeId
            } = req.body;

            const result = await Farm.create({
                name,
                description,
                imgUrl,
                location,
                area,
                TypeId,
                UserId: id,
            });

            res.status(201).json(result);

        } catch (err) {
            next(err)
        }
    }

    static async readAllFarm(req, res, next) {
        try {
            const {
                id,
                role
            } = req.user;

            const options = readAllFarmOpt(role, id)

            const result = await Farm.findAll({
                ...options,
                include: [{
                        model: User,
                        attributes: {
                            exclude: ['password']
                        }
                    },
                    Type
                ]
            });

            res.status(200).json(result);

        } catch (err) {
            next(err)
        }
    }

    static async getOneFarm(req, res, next) {
        try {
            res.status(200).json(req.farm)

        } catch (err) {
            next(err)
        }
    }

    static async readCustFarm(req, res, next) {
        try {
            const {
                id
            } = req.user;

            const result = await Farm.findAll({
                where: {
                    UserId: id
                },
                include: [Type],
                order: [
                    ['updatedAt', 'DESC']
                ]
            });

            res.status(200).json(result);

        } catch (err) {
            next(err)
        }
    }

    static async editFarm(req, res, next) {
        try {
            const {
                email
            } = req.user

            const farmId = req.params.farmId

            const {
                name,
                location,
                area,
                formId
            } = req.body

            const result = await Farm.update({
                name,
                location,
                area
            }, {
                where: {
                    id: farmId
                },
                returning: true,
            });

            if (!result[0]) {
                throw {
                    name: "NotFound",
                }
            }

            await Form.update({
                status: 'updated',
                admin: email
            }, {
                where: {
                    id: formId
                }
            })

            res.status(200).json(result[1][0]);

        } catch (err) {
            next(err)
        }
    }

    static async deleteFarm(req, res, next) {
        try {
            const formId = req.body.formId;
            const farmId = req.params.farmId;
            const {
                email
            } = req.user;

            await Type.destroy({
                where: {
                    id: farmId
                },
            });

            await Form.update({
                status: 'deleted',
                admin: email
            }, {
                where: {
                    id: formId
                }
            })

            res.status(200).json({
                message: "Farm success to delete",
            });

        } catch (err) {
            next(err);
        }
    }
}

module.exports = FarmController;