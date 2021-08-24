const router = require('express').Router();
const teacherRoute = require('./teacher');
const studentRoute = require('./student');

router.use('/teachers', teacherRoute)
router.use('/students', studentRoute)

module.exports = router