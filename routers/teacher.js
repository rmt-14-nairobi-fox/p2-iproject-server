const TeacherController = require('../controllers/teacher');
const router = require('express').Router();

router.post('/login', TeacherController.login)
router.post('/register', TeacherController.register)

module.exports = router