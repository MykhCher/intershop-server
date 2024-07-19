const { getAllItems, getItemsById } = require('../controllers/itemsController');

const Router = require('express');


const itemRouter = new Router();

itemRouter.route('/')
    .get(getAllItems);

itemRouter.route('/:itemId')
    .get(getItemsById);


module.exports = itemRouter