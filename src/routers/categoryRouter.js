const categoryController = require('../controllers/categoryController');
const { validateInstance } = require('../middleware/validate.mw');

const Router = require('express');


const categoryRouter = new Router();

categoryRouter.route('/')
    .get(categoryController.getAllCategories)
    .post(validateInstance, categoryController.createCategory)
    .put(validateInstance, categoryController.updateCategory);

categoryRouter.route('/:categoryId')
    .get(categoryController.getCategoriesById)
    .delete(categoryController.deleteCategory);


module.exports = categoryRouter