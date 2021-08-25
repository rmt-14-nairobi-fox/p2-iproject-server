const {
    Farm
} = require('../models')

const onlyAdmin = async (req, res, next) => {
    try {
        const {
            role
        } = req.user;

        if (role !== 'admin') {
            throw ({
                name: "Forbidden",
                msg: "you didn't have permission"
            })
        }

        next();

    } catch (err) {
        next(err)
    }
}

const authZ = async (req, res, next) => {
    try {
        const {
            id,
            role
        } = req.user;

        const farmId = +req.params.farmId;
        const result = await Farm.findByPk(farmId)

        if (!result) {
            throw ({
                name: "NotFound"
            })
        }

        if (role === 'admin' || result.UserId === +id) {
            req.farm = result
            next()
        }

        throw ({
            name: "Forbidden",
            msg: "you didn't have permission"
        })

    } catch (err) {
        next(err)
    }
}

module.exports = {
    onlyAdmin,
    authZ
}