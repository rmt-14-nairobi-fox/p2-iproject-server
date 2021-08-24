const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const FarmController = require('../controllers/farm-controller')
const FormController = require('../controllers/form-controller')
const errorHandling = require('../middleware/errorHandling')

router.get('/', UserController.helloWorld)

router.use(errorHandling)

module.exports = router;