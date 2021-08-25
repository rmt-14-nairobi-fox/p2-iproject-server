const router = require('express').Router()
const FarmController = require('../controllers/farm-controller');
const {
    authZ
} = require('../middleware/authorization');
const imageKit = require('../middleware/imageKit');
const multerUpload = require('../middleware/multer');

router.post('/', multerUpload, imageKit, FarmController.createFarm)
router.get('/', FarmController.readAllFarm)
router.get('/:farmId', authZ, FarmController.getOneFarm)


module.exports = router;