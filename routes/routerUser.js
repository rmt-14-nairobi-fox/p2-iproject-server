const router = require('express').Router()
const ControllerUser = require('../controllers/ControllerUser')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.post('/auth/google', ControllerUser.googleAuth)

module.exports = router