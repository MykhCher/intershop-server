const itemRouter = require('./itemRouter');
const modelRouter = require('./modelRouter');

const { Router } = require('express');


const shopRouter = new Router();

shopRouter.use('/items', itemRouter);
shopRouter.use('/models', modelRouter);


module.exports = shopRouter;