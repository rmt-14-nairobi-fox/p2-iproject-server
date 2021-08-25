const {
    Type,
} = require('../models')

class TypeController {
    static async getType(req, res, next) {
        try {
            const result = await Type.findAll()

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TypeController;