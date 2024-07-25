const storeController = require('../controllers/storeController');
const { validateInstance } = require('../middleware/validate.mw');

const Router = require('express');


const storeRouter = new Router();

storeRouter.route('/')
    .get(storeController.getAllStores)
    .post(validateInstance, storeController.createStore)
    .put(validateInstance, storeController.updateStore);

storeRouter.route('/:storeId')
    .get(storeController.getStoresById)
    .delete(storeController.deleteStore);


module.exports = storeRouter