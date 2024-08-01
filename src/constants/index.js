const { Brand, Model, Store, Category, Type } = require('../db/models');

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