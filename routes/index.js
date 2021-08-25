const router = require('express').Router()
const CustController = require('../controllers/user-cust-controller')
const FarmController = require('../controllers/farm-controller')
const FormController = require('../controllers/form-controller')
const errorHandling = require('../middleware/errorHandling')
const authentication = require('../middleware/authentication')

router.post('/register', CustController.custRegister)
router.post('/login', CustController.custLogin)


router.use(errorHandling)

module.exports = router;