const brandController = require('../controllers/brandController');
const { validators: { validateInstance }, paginate } = require('../middleware');

const Router = require('express');


const brandRouter = new Router();

brandRouter.route('/')
    .get(paginate, brandController.getAllBrands)
    .post(validateInstance, brandController.createBrand)
    .put(validateInstance, brandController.updateBrand);

brandRouter.get('/part', brandController.getBrandsPartially);

brandRouter.route('/:brandId')
    .get(brandController.getBrandsById)
    .delete(brandController.deleteBrand);


module.exports = brandRouter