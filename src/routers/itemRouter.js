const itemController = require('../controllers/itemsController');
const { validators: { validateItem }, paginate } = require('../middleware');

const Router = require('express');


const itemRouter = new Router();

itemRouter.route('/')
    .get(paginate, itemController.getAllItems)
    .post(validateItem, itemController.createItem)
    .put(validateItem, itemController.updateItem);

itemRouter.get('/part', itemController.getItemsPartially);
itemRouter.get('/attr', itemController.getItemsByAttributes);

itemRouter.route('/:itemId')
    .get(itemController.getItemsById)
    .delete(itemController.deleteItem);


module.exports = itemRouter