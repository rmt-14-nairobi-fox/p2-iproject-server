const routes = require('express').Router();
const users = require('./user');

routes.use('/', users)

module.exports = routes