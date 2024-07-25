const brandController = require('../controllers/brandController');
const { validateInstance } = require('../middleware/validate.mw');

const Router = require('express');


const brandRouter = new Router();

brandRouter.route('/')
    .get(brandController.getAllBrands)
    .post(validateInstance, brandController.createBrand)
    .put(validateInstance, brandController.updateBrand);

brandRouter.get('/part', brandController.getBrandsPartially);

brandRouter.route('/:brandId')
    .get(brandController.getBrandsById)
    .delete(brandController.deleteBrand);


module.exports = brandRouter