const orderController = require('../controllers/orderController');
const { validators: { validateOrder }, paginate } = require('../middleware');

const Router = require('express');


const orderRouter = new Router();

orderRouter.route('/')
    .get(paginate, orderController.getAllOrders)
    .post(validateOrder, orderController.createOrder)
    .put(validateOrder, orderController.updateOrder);

orderRouter.route('/:orderId')
    .get(orderController.getOrdersById)
    .delete(orderController.deleteOrder);


module.exports = orderRouter