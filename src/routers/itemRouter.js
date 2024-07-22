const { getAllItems, getItemsById, createItem } = require('../controllers/itemsController');

const Router = require('express');


const itemRouter = new Router();

itemRouter.route('/')
    .get(getAllItems)
    .post(createItem);

itemRouter.route('/:itemId')
    .get(getItemsById);


module.exports = itemRouter