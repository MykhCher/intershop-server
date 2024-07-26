const { Type, Sequelize: { Op } } = require('../db/models');

class TypeController {
    getAllTypes(req, res, next) {
        const { limit, offset } = req.pagination;
        Type.findAll( {limit, offset} )
            .then(types => {
                res.status(200).send(types[0] ? types : 'It seems to be empty here... \nPlease, try different request');
            })
            .catch(err => next(err));
    }

    getTypesPartially(req, res, next) {
        Type.count()
            .then(count => {
                Type.findAll({
                    where: {
                        id: {
                            [Op.gt]: Math.floor(count/2)
                        }
                    },
                }).then(types => {
                    res.status(200).json(types);
                });
            })
            .catch(err => next(err));
    }

    getTypesById(req, res, next) {
        const { typeId } = req.params;
        Type.findByPk(typeId)
            .then(type => {
                res.status(type ? 200 : 404).json(type ?? `type id=${typeId} not found`);
            })
            .catch(err => next(err));
    }

    createType(req, res, next) {
        const { body } = req;
        Type.create(body, {
            returning: '*'
        })
            .then(type => {
                res.status(201).json(type);
            })
            .catch(err => next(err));
    }

    updateType(req, res, next) {
        const typeId = req.body.id;
        if (!typeId) {
            return res.status(404).send('Can\'t find type. Please provide id in request body.');
        }

        Type.update(req.body, {
            where: {
                id: Number(typeId)
            }
        })
            .then(rows => {
                if (rows[0] === 0) {
                    return res.status(404).send(`type id=${typeId} not found or cannot be updated.`);
                }
                res.status(200).json(`updated ${rows[0]} row${rows[0]===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

    deleteType(req, res, next) {
        const { params: {typeId }} = req;
        
        Type.destroy({
            where: {
                id: typeId
            }
        })
            .then(rows => {
                if (rows === 0) {
                    return res.status(404).send(`type id=${typeId} not found or cannot be deleted.`);
                }
                res.status(200).json(`deleted ${rows} row${rows===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

}

module.exports = new TypeController();