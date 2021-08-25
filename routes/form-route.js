const router = require('express').Router()
const FormController = require('../controllers/form-controller');

router.post('/', FormController.createForm)
router.get('/', FormController.readAllForm)

module.exports = router;