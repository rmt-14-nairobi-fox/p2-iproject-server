const TeacherController = require('../controllers/teacher');
const { authentication, checkTeacher } = require('../middlewares/auth');
const router = require('express').Router();

router.post('/login', TeacherController.login)
router.post('/register', TeacherController.register)
router.use(authentication)
router.get('/class', checkTeacher, TeacherController.getClass)
router.get('/class/:idClass', checkTeacher, TeacherController.getStudentClass)
router.get('/class/waiting/:idClass', checkTeacher, TeacherController.getStudentWaiting)
router.post('/add-class', checkTeacher, TeacherController.addClass)
router.put('/score/:idClass/:idStudent', checkTeacher, TeacherController.updateScore)
router.patch('/accept/:idClass/:idStudent', checkTeacher, TeacherController.acceptStudent)
router.patch('/reject/:idClass/:idStudent', checkTeacher, TeacherController.rejectStudent)
router.delete('/delete/:idClass/:idStudent', checkTeacher, TeacherController.deleteStudent)

module.exports = router