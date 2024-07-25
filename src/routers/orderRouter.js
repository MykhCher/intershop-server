const orderController = require('../controllers/orderController');
const { validateOrder } = require('../middleware/validate.mw');

const Router = require('express');


const orderRouter = new Router();

orderRouter.route('/')
    .get(orderController.getAllOrders)
    .post(validateOrder, orderController.createOrder)
    .put(validateOrder, orderController.updateOrder);

orderRouter.route('/:orderId')
    .get(orderController.getOrdersById)
    .delete(orderController.deleteOrder);


module.exports = orderRouter