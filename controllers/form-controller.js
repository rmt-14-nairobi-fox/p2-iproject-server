const {
    Farm,
    Form
} = require('../models')

class FormController {
    static async createForm(req, res, next) {
        try {
            const {
                id
            } = req.user

            const {
                FarmId,
                request
            } = req.body

            const result = await Form.create({
                FarmId,
                request,
                UserId: id,
                status: 'sending',
                admin: '-'
            })

            res.status(201).json(result)

        } catch (err) {
            next(err)
        }
    }

    static async readCustForm(req, res, next) {
        try {
            const {
                id
            } = req.user

            const result = await Form.findAll({
                where: {
                    UserId: id
                },
                include: [Farm],
                order: [
                    ['updatedAt', 'DESC']
                ]
            })

            res.status(200).json(result)


        } catch (err) {
            next(err)
        }
    }
}

module.exports = FormController;