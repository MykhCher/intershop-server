const miscController = require('../controllers/miscController');

const { Router } = require('express');


const miscRouter = Router();

miscRouter.get('/modelsByBrands', miscController.modelsByBrands);
miscRouter.get('/reviewStores', miscController.itemTypesInStores);
miscRouter.get('/topOrders', miscController.customerWithMostOrders);
miscRouter.get('/topPrice', miscController.topPriceOrder);

module.exports = miscRouter;