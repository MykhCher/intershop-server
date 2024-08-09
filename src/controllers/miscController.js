const db = require('../db/models');

class MiscController {
    modelsByBrands(req, res, next) {
        db.Model.count({
            include: db.Brand,
            group: ['Brand.title'],
        })
            .then(count => res.send(count))
            .catch(next);
    }

    itemTypesInStores(req, res, next) {
        db.Item.findAll({
            attributes: [
                [db.Sequelize.col('Store.title'), 'store_title'],
                [db.Sequelize.col('Type.title'), 'type_title'],
                [db.Sequelize.fn('SUM', db.Sequelize.col('amount')), 'items_count']
            ],
            include: [
                {
                    model: db.Store,
                    attributes: []
                }, 
                {
                    model:db.Type,
                    attributes: []
                }
            ],
            group: ['Store.id', 'Type.id'],
            raw: true
        })
            .then(rows => {
                res.json(rows);
            })
            .catch(next);
    }

    customerWithMostOrders(req, res, next) {
        db.Order.findAll({
            attributes: [
                [db.Sequelize.col('Customer.full_name'), 'customer_name'],
                [db.Sequelize.fn('COUNT', db.Sequelize.col('Order.id')), 'orders_count'], 
            ],
            include: {
                model: db.Customer,
                attributes: []
            },
            group: ['Customer.id'],
            raw: true,
            order: [['orders_count', 'DESC']],
            limit: 1
        })
            .then(rows => {
                res.json(rows)
            })
            .catch(next);
    }

    topPriceOrder(req, res, next) {
        db.ItemOrder.findAll({
            attributes: [
                [db.Sequelize.col('"Order->Customer"."full_name"'), 'full_name'],
                [db.Sequelize.fn('SUM', db.sequelize.literal('("ItemOrder"."amount" * "Item"."price")')), 'order_price'],
                'orderId', 
            ],
            include: [
                {
                    model: db.Item, 
                    attributes: []
                },
                {
                    model: db.Order,
                    attributes: [],
                    include: {
                        model: db.Customer,
                        attributes: ['full_name']
                    }
                }
            ],
            group: ['ItemOrder.orderId', '"Order->Customer".id'],
            order: [['order_price', 'DESC']],
            limit: 1
        })
            .then(result => {
                res.json(result);
            })
            .catch(next);
    }
}

module.exports = new MiscController();