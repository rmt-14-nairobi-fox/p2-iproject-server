const router = require('express').Router()
const farmRoute = require('./farm-route')
const formRoute = require('./form-route')
const CustController = require('../controllers/user-cust-controller')
const AdminController = require('../controllers/user-admin-controller')
const errorHandling = require('../middleware/errorHandling')
const authentication = require('../middleware/authentication')

router.post('/register', CustController.custRegister)
router.post('/login', CustController.custLogin)
router.post('/admin/register', AdminController.adminRegister)
router.post('/admin/login', AdminController.adminLogin)

router.use(authentication)
router.use(farmRoute)
router.use(formRoute)

router.use(errorHandling)

module.exports = router;