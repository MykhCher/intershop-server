const db = require('../db/models');

class OrderController {
    getAllOrders(req, res, next) {
        db.Order.findAll( {limit: 10} )
            .then(orders => {
                res.status(200).send(orders);
            })
            .catch(err => next(err));
    }

    getOrdersById(req, res, next) {
        const { orderId } = req.params;
        db.Order.findByPk(orderId)
            .then(order => {
                res.status(order ? 200 : 404).json(order ?? `order id=${orderId} not found`);
            })
            .catch(err => next(err));
    }

    createOrder(req, res, next) {
        const { body } = req;
        db.Order.create(body, {
            returning: '*'
        })
            .then(order => {
                res.status(201).json(order);
            })
            .catch(err => next(err));
    }

    updateOrder(req, res, next) {
        const orderId = req.body.id;
        if (!orderId) {
            return res.status(404).send('Can\'t find order. Please provide id in request body.');
        }

        db.Order.update(req.body, {
            where: {
                id: Number(orderId)
            }
        })
            .then(rows => {
                if (rows[0] === 0) {
                    return res.status(404).send(`order id=${orderId} not found or cannot be updated.`);
                }
                res.status(200).json(`updated ${rows[0]} row${rows[0]===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

    deleteOrder(req, res, next) {
        const { params: {orderId }} = req;
        
        db.Order.destroy({
            where: {
                id: orderId
            }
        })
            .then(rows => {
                if (rows === 0) {
                    return res.status(404).send(`order id=${orderId} not found or cannot be deleted.`);
                }
                res.status(200).json(`deleted ${rows} row${rows===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

}

module.exports = new OrderController();