const itemController = require('../controllers/itemsController');
const { validateItem } = require('../middleware/validate.mw');

const Router = require('express');


const itemRouter = new Router();

itemRouter.route('/')
    .get(itemController.getAllItems)
    .post(validateItem, itemController.createItem)
    .put(validateItem, itemController.updateItem);

itemRouter.route('/:itemId')
    .get(itemController.getItemsById)
    .delete(itemController.deleteItem);


module.exports = itemRouter