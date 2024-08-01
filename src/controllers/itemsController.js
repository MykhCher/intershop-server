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

    async getFilteredItems(req, res, next) {
        const {brand, model, category, type, store} = req.query;
        try {
            const {id: categoryId} = category ? await Category.findOne({where: {title: category}}) : 0;
            const {id: modelId} = model ? await Model.findOne({where: {title: model}}) : 0;
            const {id: typeId} = type ? await Type.findOne({where: {title: type}}) : 0;
            const {id: brandId} = brand ? await Brand.findOne({where: {title: brand}}) : 0;
            const {id: storeId} = store ? await Store.findOne({where: {title: store}}) : 0;
    
            const items = Item.findAll({
                attributes: ['id', 'price', 'amount'], 
                where: {
                    brandId: brandId ?? {
                        [Op.gt]: 0
                    }, 
                    categoryId: categoryId ?? {
                        [Op.gt]: 0
                    },
                    modelId: modelId ?? {
                        [Op.gt]: 0
                    }, 
                    storeId: storeId ?? {
                        [Op.gt]: 0
                    },
                    typeId: typeId ?? {
                        [Op.gt]: 0
                    },
                },
                include: includeOptions,
                raw: true
            })

            items[0]
                ? res.status(200).json(items)
                : next(createError(404, `items not found`));
                
        } catch (error) {
            if( error.name === 'TypeError') {
                return next(createError(500, `Cannot find entered fields`));
            }
            next(error);
        }
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