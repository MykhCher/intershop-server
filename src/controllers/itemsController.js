const db = require('../db/models');

class ItemController {
    getAllItems(req, res, next) {
        const { limit, offset } = req.pagination;
        db.Item.findAll( {limit, offset} )
            .then(items => {
                res.status(200).send(items);
            })
            .catch(err => next(err));
    }

    getItemsById(req, res, next) {
        const { itemId } = req.params;
        db.Item.findByPk(itemId)
            .then(item => {
                res.status(item ? 200 : 404).json(item ?? `item id=${itemId} not found`);
            })
            .catch(err => next(err));
    }

    createItem(req, res, next) {
        const { body } = req;
        db.Item.create(body, {
            returning: '*'
        })
            .then(item => {
                res.status(201).json(item);
            })
            .catch(err => next(err));
    }

    updateItem(req, res, next) {
        const itemId = req.body.id;
        if (!itemId) {
            return res.status(404).send('Can\'t find item. Please provide id in request body.');
        }

        db.Item.update(req.body, {
            where: {
                id: Number(itemId)
            }
        })
            .then(rows => {
                if (rows[0] === 0) {
                    return res.status(404).send(`item id=${itemId} not found or cannot be updated.`);
                }
                res.status(200).json(`updated ${rows[0]} row${rows[0]===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

    deleteItem(req, res, next) {
        const { params: {itemId }} = req;
        
        db.Item.destroy({
            where: {
                id: itemId
            }
        })
            .then(rows => {
                if (rows === 0) {
                    return res.status(404).send(`item id=${itemId} not found or cannot be deleted.`);
                }
                res.status(200).json(`deleted ${rows} row${rows===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

}

module.exports = new ItemController();