const router = require('express').Router()
const FarmController = require('../controllers/farm-controller');
const imageKit = require('../middleware/imageKit');
const multerUpload = require('../middleware/multer');

router.post('/farm', multerUpload, imageKit, FarmController.createFarm)
router.get('/farm', FarmController.readCustFarm)

module.exports = router;