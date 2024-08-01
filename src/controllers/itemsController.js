const createError = require('http-errors');

const { Item, Brand, Model, Store, Category, Type, Sequelize: { Op } } = require('../db/models');


const includeOptions = [
    {
        model: Category,
        attributes: ['title']
    },
    {
        model: Type,
        attributes: ['title']
    },
    {
        model: Brand,
        attributes: ['title']
    },
    {
        model: Model,
        attributes: ['title']
    },
    {
        model: Store,
        attributes: ['title']
    },
];


class ItemController {
    getAllItems(req, res, next) {
        const { limit, offset } = req.pagination;
        Item.findAll( {attributes: ['id', 'price', 'amount'], limit, offset, include: includeOptions, raw: true} )
            .then(items => {
                res.status(200).send(items[0] ? items : 'It seems to be empty here... \nPlease, try different request');
            })
            .catch(err => next(err));
    }

    getItemsPartially(req, res, next) {
        Item.count()
            .then(count => {
                Item.findAll({
                    attributes: ['id', 'price', 'amount'], 
                    where: {
                        id: {
                            [Op.gt]: Math.floor(count/2)
                        }
                    },
                    include: includeOptions,
                    raw: true
                }).then(items => {
                    res.status(200).json(items);
                });
            })
            .catch(err => next(err));
    }

    getItemsByAttributes(req, res, next) {

        const response = [];

        const promises = Object.keys(req.query).map(async fieldName => {
            if ( fieldName.match(/(brand|model|store|type|category)/) ) {

                const [instanceName] = fieldName.match(/(brand|model|store|type|category)/);
                let queryResult;

                switch (instanceName) {
                    case 'brand':
                        queryResult = await Brand.findOne({where: {
                            title: req.query[fieldName]
                        }})
                        break;
                    case 'model':
                        queryResult = await Model.findOne({where: {
                            title: req.query[fieldName]
                        }})
                        break;
                    case 'store':
                        queryResult = await Store.findOne({where: {
                            title: req.query[fieldName]
                        }})
                        break;
                    case 'type':
                        queryResult = await Type.findOne({where: {
                            title: req.query[fieldName]
                        }})
                        break;
                    case 'category':
                        queryResult = await Category.findOne({where: {
                            title: req.query[fieldName]
                        }})
                        break;
                }
                               
                await Item.findAll({
                    attributes: ['id', 'price', 'amount'],
                    where: {
                        [`${instanceName}Id`]: queryResult.id
                    },
                    include: includeOptions,
                    raw : true
                }).then(items => {response.push(...items)});

            } else if (req.query[fieldName] instanceof Array) {
                await Item.findAll({
                    attributes: ['id', 'price', 'amount'], 
                    where: {
                        [fieldName] : {
                            [Op.in] : req.query[fieldName]
                        },
                    include: includeOptions,
                    raw: true
                    }})
                        .then(items => {
                            response.push(...items);
                        })
            } else {
                await Item.findOne({
                    attributes: ['id', 'price', 'amount'], 
                    where: {
                        [fieldName]: req.query[fieldName]
                    },
                    include: includeOptions,
                    raw: true
                })
                    .then(item => {
                        if (item) response.push(item); 
                    })
            }
        });

        Promise.all(promises)
            .then(() => {
                response[0] 
                    ? res.status(200).json(response)
                    : next(createError(404, 'Found no items matching your query :('));
            })
            .catch(err => next(err));

    }

    getItemsById(req, res, next) {
        const { itemId } = req.params;
        Item.findByPk(itemId, { attributes: ['id', 'price', 'amount'], include: includeOptions, raw: true})
            .then(item => {
                res.status(item ? 200 : 404).json(item ?? `item id=${itemId} not found`);
            })
            .catch(err => next(err));
    }

    createItem(req, res, next) {
        const { body } = req;
        Item.create(body, {
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

        Item.update(req.body, {
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
        
        Item.destroy({
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