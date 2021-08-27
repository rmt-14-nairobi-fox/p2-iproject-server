const router = require('express').Router()
const Controller = require('./../controllers/userController')
const oauthController = require('./../controllers/oauthController')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/oauth', oauthController.googleLogin)

module.exports = router