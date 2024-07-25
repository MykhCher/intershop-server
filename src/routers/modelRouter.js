const modelController = require('../controllers/modelsController');
const { validateInstance } = require('../middleware/validate.mw');

const Router = require('express');


const modelRouter = new Router();

modelRouter.route('/')
    .get(modelController.getAllModels)
    .post(validateInstance, modelController.createModel)
    .put(validateInstance, modelController.updateModel);

modelRouter.route('/:modelId')
    .get(modelController.getModelsById)
    .delete(modelController.deleteModel);


module.exports = modelRouter