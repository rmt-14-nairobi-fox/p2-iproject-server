const router = require('express').Router()
const routerUser = require('./routerUser')
const routerDestination = require('./routerDestination')

router.use('/', routerUser)
router.use('/destinations', routerDestination)

module.exports = router