const { Store, Sequelize: { Op } } = require('../db/models');

class StoreController {
    getAllStores(req, res, next) {
        const { limit, offset } = req.pagination;
        Store.findAll( {limit, offset} )
            .then(stores => {
                res.status(200).send(stores[0] ? stores : 'It seems to be empty here... \nPlease, try different request');
            })
            .catch(err => next(err));
    }

    getStoresPartially(req, res, next) {
        Store.count()
            .then(count => {
                Store.findAll({
                    where: {
                        id: {
                            [Op.gt]: Math.floor(count/2)
                        }
                    },
                }).then(stores => {
                    res.status(200).json(stores);
                });
            })
            .catch(err => next(err));
    }

    getStoresById(req, res, next) {
        const { storeId } = req.params;
        Store.findByPk(storeId)
            .then(store => {
                res.status(store ? 200 : 404).json(store ?? `store id=${storeId} not found`);
            })
            .catch(err => next(err));
    }

    createStore(req, res, next) {
        const { body } = req;
        Store.create(body, {
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

        Store.update(req.body, {
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
        
        Store.destroy({
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