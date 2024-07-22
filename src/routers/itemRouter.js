const itemController = require('../controllers/itemsController');

const Router = require('express');


const itemRouter = new Router();

itemRouter.route('/')
    .get(itemController.getAllItems)
    .post(itemController.createItem)
    .put(itemController.updateItem);

itemRouter.route('/:itemId')
    .get(itemController.getItemsById)
    .delete(itemController.deleteItem);


module.exports = itemRouter