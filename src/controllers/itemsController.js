const db = require('../db/models');

class ItemController {
    getAllItems(req, res, next) {
        db.Item.findAll( {limit: 10} )
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

}

module.exports = new ItemController();