const router = require('express').Router()
const FormController = require('../controllers/form-controller');

router.post('/form', FormController.createForm)
router.get('/form', FormController.readCustForm)

module.exports = router;