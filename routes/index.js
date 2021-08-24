const routers = require('express').Router();
const userRouters = require('./user')
const categoryRouters = require('./category')
const drugRouters = require('./drug')
const customersRouters = require('./customers')
const {authentication} = require('../middlewares/auth')

routers.use('/',userRouters)
routers.use('/customers',customersRouters)
routers.use(authentication)
routers.use('/categories',categoryRouters)
routers.use('/drug',drugRouters)

module.exports=routers;