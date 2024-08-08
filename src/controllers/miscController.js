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
            attributes: [[db.Sequelize.fn('SUM', db.Sequelize.col('amount')), 'total_amount']],
            include: [db.Store, db.Type],
            group: ['Store.id', 'Type.id'],
            raw: true
        })
            .then(rows => {
                const result = rows.map(row => {
                    return {
                        "type_title": row['Type.title'],
                        "store_title": row['Store.title'],
                        "total_amount": Number(row.total_amount),
                    }
                });

                res.json(result);
            })
            .catch(next);
    }

    customerWithMostOrders(req, res, next) {
        db.Order.findAll({
            attributes: [[db.Sequelize.fn('COUNT', db.Sequelize.col('Order.id')), 'orders']],
            include: [db.Customer],
            group: ['Customer.id'],
            raw: true,
            order: [['orders', 'DESC']],
            limit: 1
        })
            .then(rows => {
                const result = rows.map(row => {
                    return {
                        "full_name": row['Customer.full_name'],
                        "orders": row.orders
                    }
                });

                res.send(result)

            })
            .catch(next);
    }
}

module.exports = new MiscController();