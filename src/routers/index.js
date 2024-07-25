const itemRouter = require('./itemRouter');
const modelRouter = require('./modelRouter');
const brandRouter = require('./brandRouter');
const categoryRouter = require('./categoryRouter');
const customerRouter = require('./customerRouter');
const orderRouter = require('./orderRouter');
const storeRouter = require('./storeRouter');
const typeRouter = require('./typeRouter');

const { Router } = require('express');


const shopRouter = new Router();

shopRouter.use('/items', itemRouter);
shopRouter.use('/models', modelRouter);
shopRouter.use('/brands', brandRouter);
shopRouter.use('/categories', categoryRouter);
shopRouter.use('/customers', customerRouter);
shopRouter.use('/orders', orderRouter);
shopRouter.use('/stores', storeRouter);
shopRouter.use('/types', typeRouter);


module.exports = shopRouter;