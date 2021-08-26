const routers = require('express').Router();
const CustomerController = require('../controllers/customerController');
const {authentication, isCustomer} =require('../middlewares/auth')

routers.post('/register', CustomerController.register)
routers.post('/login', CustomerController.login)
routers.post('/glogin', CustomerController.googleLogin)
routers.get('/categories', CustomerController.showCategory)
routers.get('/categories/:name', CustomerController.showCategoryDetail)
routers.get('/product/:name', CustomerController.showProductDetail)
routers.get('/search/:name', CustomerController.showProductSimilar)
routers.use(authentication)
routers.get('/favorite', isCustomer, CustomerController.showFavorites)
routers.post('/favorite',isCustomer, CustomerController.addFavorite)
routers.delete('/favorite/:id', isCustomer, CustomerController.deleteFavorite)


module.exports= routers