const userRoutes = require('./user');
const projectRoutes = require('./project');
const userProjectRoutes = require('./user-project');
const router = require('express').Router();

router.use('/user', userRoutes);
router.use('/project', projectRoutes);
router.use('/userproject', userProjectRoutes);

module.exports = router
