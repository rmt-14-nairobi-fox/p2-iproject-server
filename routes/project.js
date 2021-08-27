const Controller = require('../controllers/project');
const { authorize } = require('../middleware/authorize');
const { uploadSingle } = require('../middleware/multer');
const { image } = require('../middleware/integration-image')
const router = require('express').Router();

router.post('/create', authorize, uploadSingle, image, Controller.createProject);
router.post('/:id/position', authorize, Controller.addPosition);
router.get('/', authorize, Controller.getAllProject);
router.get('/:id', authorize, Controller.getProject);
router.put('/edit/:id', authorize, uploadSingle, image, Controller.patchProject);
router.delete('/delete/:id', authorize, Controller.deleteProject);
router.get('/:id', authorize, Controller.getChatRooms)


module.exports = router