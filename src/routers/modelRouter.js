const modelController = require('../controllers/modelsController');
const { validators: { validateInstance }, paginate } = require('../middleware');

const Router = require('express');


const modelRouter = new Router();

modelRouter.route('/')
    .get(paginate, modelController.getAllModels)
    .post(validateInstance, modelController.createModel)
    .put(validateInstance, modelController.updateModel);

modelRouter.route('/:modelId')
    .get(modelController.getModelsById)
    .delete(modelController.deleteModel);


module.exports = modelRouter