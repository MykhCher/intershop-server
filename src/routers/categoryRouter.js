const categoryController = require('../controllers/categoryController');

const Router = require('express');


const categoryRouter = new Router();

categoryRouter.route('/')
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory)
    .put(categoryController.updateCategory);

categoryRouter.route('/:categoryId')
    .get(categoryController.getCategoriesById)
    .delete(categoryController.deleteCategory);


module.exports = categoryRouter