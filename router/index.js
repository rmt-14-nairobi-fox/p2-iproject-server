const router = require('express').Router()
const userRoutes = require('./userRoutes')
const storyRoutes = require('./storyRoutes')
const errorHandler = require('./../middlewares/errorHandler')

router.use('/user', userRoutes)
router.use('/stories', storyRoutes)


router.use(errorHandler)
module.exports = router