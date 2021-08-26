const router = require('express').Router()
const routerUser = require('./routerUser')
const routerDestination = require('./routerDestination')
const routerWishlist = require('./routerWishlist')
const errorHandler = require('../middlewares/errorHandler')

router.use('/', routerUser)
router.use('/destinations', routerDestination)
router.use('/wishlists', routerWishlist)
router.use(errorHandler)

module.exports = router