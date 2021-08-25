const router = require('express').Router()
const FarmController = require('../controllers/farm-controller');
const FormController = require('../controllers/form-controller');

router.get('/farm', FarmController.readAllFarm)
router.get('/form', FormController.readAllForm)
router.get('/form/:id', FormController.getOneForm)
router.put('/farm/:farmId', FarmController.editFarm)
router.delete('/farm/:farmId', FarmController.deleteFarm)

module.exports = router;