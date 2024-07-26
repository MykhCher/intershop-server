const db = require('../db/models');

class StoreController {
    getAllStores(req, res, next) {
        const { limit, offset } = req.pagination;
        db.Store.findAll( {limit, offset} )
            .then(stores => {
                res.status(200).send(stores);
            })
            .catch(err => next(err));
    }

    getStoresById(req, res, next) {
        const { storeId } = req.params;
        db.Store.findByPk(storeId)
            .then(store => {
                res.status(store ? 200 : 404).json(store ?? `store id=${storeId} not found`);
            })
            .catch(err => next(err));
    }

    createStore(req, res, next) {
        const { body } = req;
        db.Store.create(body, {
            returning: '*'
        })
            .then(store => {
                res.status(201).json(store);
            })
            .catch(err => next(err));
    }

    updateStore(req, res, next) {
        const storeId = req.body.id;
        if (!storeId) {
            return res.status(404).send('Can\'t find store. Please provide id in request body.');
        }

        db.Store.update(req.body, {
            where: {
                id: Number(storeId)
            }
        })
            .then(rows => {
                if (rows[0] === 0) {
                    return res.status(404).send(`store id=${storeId} not found or cannot be updated.`);
                }
                res.status(200).json(`updated ${rows[0]} row${rows[0]===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

    deleteStore(req, res, next) {
        const { params: {storeId }} = req;
        
        db.Store.destroy({
            where: {
                id: storeId
            }
        })
            .then(rows => {
                if (rows === 0) {
                    return res.status(404).send(`store id=${storeId} not found or cannot be deleted.`);
                }
                res.status(200).json(`deleted ${rows} row${rows===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

}

module.exports = new StoreController();