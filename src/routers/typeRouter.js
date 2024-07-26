const typeController = require('../controllers/typeController');
const { validators: { validateInstance }, paginate } = require('../middleware');

const Router = require('express');


const typeRouter = new Router();

typeRouter.route('/')
    .get(paginate, typeController.getAllTypes)
    .post(validateInstance, typeController.createType)
    .put(validateInstance, typeController.updateType);

typeRouter.get('/part', typeController.getTypesPartially);

typeRouter.route('/:typeId')
    .get(typeController.getTypesById)
    .delete(typeController.deleteType);


module.exports = typeRouter