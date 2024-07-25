const customerController = require('../controllers/customerController');

const Router = require('express');


const customerRouter = new Router();

customerRouter.route('/')
    .get(customerController.getAllCustomers)
    .post(customerController.createCustomer)
    .put(customerController.updateCustomer);

customerRouter.route('/:customerId')
    .get(customerController.getCustomersById)
    .delete(customerController.deleteCustomer);


module.exports = customerRouter