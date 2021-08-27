const UserController = require('../controllers/user');
const router = require('express').Router();

router.post('/recruiter/register', UserController.recruiterRegister);
router.post('/recruiter/login', UserController.recruiterLogin);
router.post('/employee/register', UserController.registerEmployee);
router.post('/employee/login', UserController.LoginEmployee);
router.post('/employee/github', UserController.authGithub);

module.exports = router