const StudentController = require('../controllers/student');
const { authentication, checkStudent } = require('../middlewares/auth');
const checkId = require('../middlewares/checkId');
const router = require('express').Router();

router.post('/login', StudentController.login)
router.post('/register', StudentController.register)
router.use(authentication)
router.get('/my-class', checkStudent, StudentController.getMyClass)
router.get('/all-class', checkStudent, StudentController.getClass)
router.get('/waiting-class', checkStudent, StudentController.getWaitingClass)
router.get('/my-score/:idClass', checkStudent, StudentController.getMyScore)
router.post('/join-class/:id', checkId, checkStudent, StudentController.joinClass)

module.exports = router