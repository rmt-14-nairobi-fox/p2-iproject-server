const router = require('express').Router()
const userRoutes = require('./userRoutes')
const errorHandler = require('./../middlewares/errorHandler')

router.use('/user', userRoutes)

router.use(errorHandler)
module.exports = router