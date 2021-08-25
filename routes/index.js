const router = require('express').Router()
const farmRoute = require('./farm-route')
const CustController = require('../controllers/user-cust-controller')
const FormController = require('../controllers/form-controller')
const errorHandling = require('../middleware/errorHandling')
const authentication = require('../middleware/authentication')

router.post('/register', CustController.custRegister)
router.post('/login', CustController.custLogin)

router.use(authentication)
router.use(farmRoute)

router.use(errorHandling)

module.exports = router;