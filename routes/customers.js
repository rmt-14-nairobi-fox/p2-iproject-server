const routers = require('express').Router();
const CustomerController = require('../controllers/customerController');
const {authentication, isCustomer} =require('../middlewares/auth')

routers.post('/register', CustomerController.register)
routers.post('/login', CustomerController.login)
routers.post('/glogin', CustomerController.googleLogin)
routers.get('/home', CustomerController.showAll)
routers.get('/home/:id', CustomerController.showById)
routers.get('/categories', CustomerController.showCategory)
routers.use(authentication)
routers.get('/favorite', isCustomer, CustomerController.showFavorites)
routers.post('/favorite/:id',isCustomer, CustomerController.addFavorite)
routers.delete('/favorite/:id', isCustomer, CustomerController.deleteFavorite)


module.exports= routers