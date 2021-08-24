const routers = require('express').Router();
const userRouters = require('./user')
const categoryRouters = require('./category')
const {authentication} = require('../middlewares/auth')

routers.use('/',userRouters)
routers.use(authentication)
routers.use('/categories',categoryRouters)

module.exports=routers;