const orderController = require('../controllers/orderController');

const Router = require('express');


const orderRouter = new Router();

orderRouter.route('/')
    .get(orderController.getAllOrders)
    .post(orderController.createOrder)
    .put(orderController.updateOrder);

orderRouter.route('/:orderId')
    .get(orderController.getOrdersById)
    .delete(orderController.deleteOrder);


module.exports = orderRouter