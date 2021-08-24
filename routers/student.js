const StudentController = require('../controllers/student');
const { authentication, checkStudent } = require('../middlewares/auth');
const checkId = require('../middlewares/checkId');
const router = require('express').Router();

router.post('/login', StudentController.login)
router.post('/register', StudentController.register)
router.use(authentication)
router.post('/join-class/:id', checkId, checkStudent, StudentController.joinClass)
router.get('/my-class', StudentController.getClass)

module.exports = router