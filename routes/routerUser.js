const router = require('express').Router()
const ControllerUser = require('../controllers/ControllerUser')
const authentication = require('../middlewares/authentication')

router.get('/users',authentication, ControllerUser.userLoginned)
router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.post('/auth/google', ControllerUser.googleAuth)

module.exports = router