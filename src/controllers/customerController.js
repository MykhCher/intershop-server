const db = require('../db/models');

class CustomerController {
    getAllCustomers(req, res, next) {
        const { limit, offset } = req.pagination;
        db.Customer.findAll( {limit, offset} )
            .then(customers => {
                res.status(200).send(customers);
            })
            .catch(err => next(err));
    }

    getCustomersById(req, res, next) {
        const { customerId } = req.params;
        db.Customer.findByPk(customerId)
            .then(customer => {
                res.status(customer ? 200 : 404).json(customer ?? `customer id=${customerId} not found`);
            })
            .catch(err => next(err));
    }

    createCustomer(req, res, next) {
        const { body } = req;
        db.Customer.create(body, {
            returning: '*'
        })
            .then(customer => {
                res.status(201).json(customer);
            })
            .catch(err => next(err));
    }

    updateCustomer(req, res, next) {
        const customerId = req.body.id;
        if (!customerId) {
            return res.status(404).send('Can\'t find customer. Please provide id in request body.');
        }

        db.Customer.update(req.body, {
            where: {
                id: Number(customerId)
            }
        })
            .then(rows => {
                if (rows[0] === 0) {
                    return res.status(404).send(`customer id=${customerId} not found or cannot be updated.`);
                }
                res.status(200).json(`updated ${rows[0]} row${rows[0]===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

    deleteCustomer(req, res, next) {
        const { params: {customerId }} = req;
        
        db.Customer.destroy({
            where: {
                id: customerId
            }
        })
            .then(rows => {
                if (rows === 0) {
                    return res.status(404).send(`customer id=${customerId} not found or cannot be deleted.`);
                }
                res.status(200).json(`deleted ${rows} row${rows===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

}

module.exports = new CustomerController();