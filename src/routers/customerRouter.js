const customerController = require('../controllers/customerController');
const { validators: { validateCustomer }, paginate } = require('../middleware');

const Router = require('express');


const customerRouter = new Router();

customerRouter.route('/')
    .get(paginate, customerController.getAllCustomers)
    .post(validateCustomer, customerController.createCustomer)
    .put(validateCustomer, customerController.updateCustomer);

customerRouter.route('/:customerId')
    .get(customerController.getCustomersById)
    .delete(customerController.deleteCustomer);


module.exports = customerRouter