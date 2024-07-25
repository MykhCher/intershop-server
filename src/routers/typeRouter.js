const typeController = require('../controllers/typeController');

const Router = require('express');


const typeRouter = new Router();

typeRouter.route('/')
    .get(typeController.getAllTypes)
    .post(typeController.createType)
    .put(typeController.updateType);

typeRouter.route('/:typeId')
    .get(typeController.getTypesById)
    .delete(typeController.deleteType);


module.exports = typeRouter