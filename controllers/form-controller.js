const {
    readAllFarmOpt
} = require('../helpers/optionsHelper');
const {
    Form,
} = require('../models')

class FormController {
    static async createForm(req, res, next) {
        try {
            const {
                id,
                email,
                phone
            } = req.user

            const {
                FarmId,
                farmName,
                request
            } = req.body

            const result = await Form.create({
                user: email,
                number: phone,
                UserId: id,
                FarmId: FarmId,
                farmName,
                request,
                status: 'sending',
                admin: '-'
            })

            res.status(201).json(result)

        } catch (err) {
            next(err)
        }
    }

    static async readAllForm(req, res, next) {
        try {
            const {
                id,
                role
            } = req.user

            const options = readAllFarmOpt(role, id)
            const result = await Form.findAll({
                ...options
            })

            res.status(200).json(result)

        } catch (err) {
            next(err)
        }
    }

    static async getOneForm(req, res, next) {
        try {
            const id = req.params.id
            const result = await Form.findByPk(id)

            if (!result) {
                throw ({
                    name: "NotFound"
                })
            }

            res.status(200).json(result)

        } catch (err) {
            next(err)
        }
    }
}

module.exports = FormController;