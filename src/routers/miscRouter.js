const miscController = require('../controllers/miscController');

const { Router } = require('express');


const miscRouter = Router();

miscRouter.get('/modelsByBrands', miscController.modelsByBrands);

module.exports = miscRouter;