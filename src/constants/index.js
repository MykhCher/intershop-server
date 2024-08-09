const { Brand, Model, Store, Category, Type, Sequelize: { Op } } = require('../db/models');

module.exports.itemIncludeOptions = [
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

module.exports.checkQuery = (field) => {
    return field 
        ? {
            [Op.in]: field.map(model => model.id)
        } 
        : {
            [Op.gt]: 0
        }
}