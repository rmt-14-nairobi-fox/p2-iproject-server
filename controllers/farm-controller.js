const {
    Farm,
    Type
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
}

module.exports = FarmController;