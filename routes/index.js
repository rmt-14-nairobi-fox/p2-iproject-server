const routers = require('express').Router();
const userRouters = require('./user')
const customersRouters = require('./customers')

routers.use('/',userRouters)
routers.use('/customers',customersRouters)

module.exports=routers;