const router = require('express').Router()
const FarmController = require('../controllers/farm-controller');
const FormController = require('../controllers/form-controller');

router.get('/admin/farm', FarmController.readAllFarm)
router.get('/admin/form', FormController.readAllForm)
router.get('/admin/form/:id', FormController.getOneForm)

module.exports = router;