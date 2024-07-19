const itemRouter = require('./itemRouter');

const { Router } = require('express');


const shopRouter = new Router();

shopRouter.use('/items', itemRouter);


module.exports = shopRouter;