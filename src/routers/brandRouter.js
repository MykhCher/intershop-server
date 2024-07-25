const brandController = require('../controllers/brandController');

const Router = require('express');


const brandRouter = new Router();

brandRouter.route('/')
    .get(brandController.getAllBrands)
    .post(brandController.createBrand)
    .put(brandController.updateBrand);

brandRouter.route('/:brandId')
    .get(brandController.getBrandsById)
    .delete(brandController.deleteBrand);


module.exports = brandRouter