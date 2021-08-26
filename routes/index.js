const router = require('express').Router()
const UserController = require('../controllers/user')
const coin = require('./coin')
const watcher = require('./watcher')
const authenticate = require('../middlewares/authenticate')

router.post('/login',UserController.login)
router.post('/register', UserController.register)

router.use('/coins', coin)

router.use(authenticate)

router.use('/watchers', watcher)


module.exports = router