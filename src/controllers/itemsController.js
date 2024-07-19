const db = require('../db/models');

class ItemController {
    getAllItems(req, res) {
        try {
            db.Item.findAll( {limit: 10} )
                .then(items => {
                    res.status(200).send(items);
                });
        } catch (error) {
            res.status(500).json({
                title: 'Error',
                message: error.message
            });
        }
    }

    getItemsById(req, res) {
        try {
            const { itemId } = req.params;
            db.Item.findAll({
                where: {
                    id: itemId
                } 
            })
                .then(items => {
                    const [item] = items;
                    res.status(item ? 200 : 404).json(item ?? `item id=${itemId} not found`);
                })
        } catch (error) {
            res.status(500).json({
                title: 'Error',
                message: error.message
            });
        }
    }

}

module.exports = new ItemController();