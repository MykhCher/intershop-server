const modelController = require('../controllers/modelsController');

const Router = require('express');


const modelRouter = new Router();

modelRouter.route('/')
    .get(modelController.getAllModels)
    .post(modelController.createModel)
    .put(modelController.updateModel);

modelRouter.route('/:modelId')
    .get(modelController.getModelsById)
    .delete(modelController.deleteModel);


module.exports = modelRouter