const routers = require('express').Router();
const CategoryController = require('../controllers/categoryController');

routers.get('/', CategoryController.showAll)
routers.get('/:id', CategoryController.showById)
routers.post('/', CategoryController.createCategory)
routers.delete('/:id', CategoryController.deleteCategory)
routers.put('/:id', CategoryController.updateCategory)

module.exports= routers