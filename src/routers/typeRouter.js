const typeController = require('../controllers/typeController');
const { validateInstance } = require('../middleware/validate.mw');

const Router = require('express');


const typeRouter = new Router();

typeRouter.route('/')
    .get(typeController.getAllTypes)
    .post(validateInstance, typeController.createType)
    .put(validateInstance, typeController.updateType);

typeRouter.route('/:typeId')
    .get(typeController.getTypesById)
    .delete(typeController.deleteType);


module.exports = typeRouter