const { User, Petition, Sign } = require('../models');

class PublicController {
    static async getAllPet(req, res, next) {
        try {
            const listP = await Petition.findAll({
                where: {
                    status: 'published'
                },
                include: {
                    model: User,
                    attributes: ['username']
                }
            })

            res.status(200).json(listP)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = PublicController