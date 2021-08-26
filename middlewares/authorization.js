const { Destination } = require('../models')

const authorization = async (req, res, next) => {
    const destinationId = req.params.id
    try {
        const foundDestination = await Destination.findByPk(destinationId)

        if (!foundDestination) throw { name: 'data not found' }
        else {
            if (req.user.role === 'admin') next()
            else throw { name: 'Forbidden' }
        }
    } catch (err) {
        next(err)
    }
}

const authorizationWishlist = async (req, res, next) => {
    try {
        if (req.user.role === 'customer') next()
        else throw { name: 'Only For Customers' }
    } catch (err) {
        next(err)
    }
}

module.exports = { authorization, authorizationWishlist }