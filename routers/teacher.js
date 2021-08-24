const TeacherController = require('../controllers/teacher');
const { authentication, checkTeacher } = require('../middlewares/auth');
const router = require('express').Router();

router.post('/login', TeacherController.login)
router.post('/register', TeacherController.register)
router.use(authentication)
router.post('/add-class', checkTeacher, TeacherController.addClass)

module.exports = router