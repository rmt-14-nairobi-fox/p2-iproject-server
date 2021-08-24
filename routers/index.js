const router = require('express').Router();
const teacherRoute = require('./teacher');
const studentRoute = require('./student');

router.use('/teacher', teacherRoute)
router.use('/student', studentRoute)

module.exports = router