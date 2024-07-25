const db = require('../db/models');

class TypeController {
    getAllTypes(req, res, next) {
        db.Type.findAll( {limit: 10} )
            .then(types => {
                res.status(200).send(types);
            })
            .catch(err => next(err));
    }

    getTypesById(req, res, next) {
        const { typeId } = req.params;
        db.Type.findByPk(typeId)
            .then(type => {
                res.status(type ? 200 : 404).json(type ?? `type id=${typeId} not found`);
            })
            .catch(err => next(err));
    }

    createType(req, res, next) {
        const { body } = req;
        db.Type.create(body, {
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

        db.Type.update(req.body, {
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
        
        db.Type.destroy({
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