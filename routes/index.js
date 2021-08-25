const routes = require('express').Router();
const users = require('./user');
const petitions = require('./petition');
const { authentication } = require('../middlewares/auth');

routes.use('/', users)

routes.use(authentication)

routes.use('/petitions', petitions)

module.exports = routes