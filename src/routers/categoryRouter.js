const categoryController = require('../controllers/categoryController');
const { validators: { validateInstance }, paginate } = require('../middleware');

const Router = require('express');


const categoryRouter = new Router();

categoryRouter.route('/')
    .get(paginate, categoryController.getAllCategories)
    .post(validateInstance, categoryController.createCategory)
    .put(validateInstance, categoryController.updateCategory);

categoryRouter.route('/:categoryId')
    .get(categoryController.getCategoriesById)
    .delete(categoryController.deleteCategory);


module.exports = categoryRouter