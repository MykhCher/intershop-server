const storeController = require('../controllers/storeController');
const { validators: { validateInstance }, paginate } = require('../middleware');

const Router = require('express');


const storeRouter = new Router();

storeRouter.route('/')
    .get(paginate, storeController.getAllStores)
    .post(validateInstance, storeController.createStore)
    .put(validateInstance, storeController.updateStore);

storeRouter.route('/:storeId')
    .get(storeController.getStoresById)
    .delete(storeController.deleteStore);


module.exports = storeRouter