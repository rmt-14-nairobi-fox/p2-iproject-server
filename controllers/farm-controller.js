const {
    Farm,
    Type,
    User
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

    static async readAllFarm(req, res, next) {
        try {
            const result = await Farm.findAll({
                include: [Type, User],
                order: [
                    ['updatedAt', 'DESC']
                ]
            });

            res.status(200).json(result);

        } catch (err) {
            next(err)
        }
    }

    // refactor nnti di find all farm
    static async readFarmByUser(req, res, next) {
        try {
            const UserId = req.body.UserId

            const result = await Farm.findAll({
                where: {
                    UserId
                }
            })

            res.status(200).json(result);

        } catch (err) {
            next(err)
        }
    }
}

module.exports = FarmController;