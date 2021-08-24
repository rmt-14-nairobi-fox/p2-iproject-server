const routers = require('express').Router();
const DrugController = require('../controllers/drugController');
const {authorization} = require('../middlewares/auth')
const ImageKit = require('../middlewares/imageKit')
const multer= require('multer')

const upload = multer({
    storage : multer.memoryStorage()
})

routers.get('/', DrugController.showAll)
routers.get('/:id', DrugController.showById)
routers.post('/', upload.single('imgUrl'), ImageKit, DrugController.createDrug)
routers.put('/:id', authorization, upload.single('imgUrl'), ImageKit,DrugController.updateDrug)
routers.delete('/:id', authorization, DrugController.deleteDrug)

module.exports= routers