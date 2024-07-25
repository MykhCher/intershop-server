const storeController = require('../controllers/storeController');

const Router = require('express');


const storeRouter = new Router();

storeRouter.route('/')
    .get(storeController.getAllStores)
    .post(storeController.createStore)
    .put(storeController.updateStore);

storeRouter.route('/:storeId')
    .get(storeController.getStoresById)
    .delete(storeController.deleteStore);


module.exports = storeRouter