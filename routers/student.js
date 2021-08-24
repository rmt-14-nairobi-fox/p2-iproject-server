const StudentController = require('../controllers/student');
const router = require('express').Router();

router.post('/login', StudentController.login)
router.post('/register', StudentController.register)

module.exports = router