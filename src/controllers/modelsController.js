const db = require('../db/models');

class ModelController {
    getAllModels(req, res, next) {
        db.Model.findAll( {limit: 10} )
            .then(models => {
                res.status(200).send(models);
            })
            .catch(err => next(err));
    }

    getModelsById(req, res, next) {
        const { modelId } = req.params;
        db.Model.findByPk(modelId)
            .then(model => {
                res.status(model ? 200 : 404).json(model ?? `model id=${modelId} not found`);
            })
            .catch(err => next(err));
    }

    createModel(req, res, next) {
        const { body } = req;
        db.Model.create(body, {
            returning: '*'
        })
            .then(model => {
                res.status(201).json(model);
            })
            .catch(err => next(err));
    }

    updateModel(req, res, next) {
        const modelId = req.body.id;
        if (!modelId) {
            return res.status(404).send('Can\'t find model. Please provide id in request body.');
        }

        db.Model.update(req.body, {
            where: {
                id: Number(modelId)
            }
        })
            .then(rows => {
                if (rows[0] === 0) {
                    return res.status(404).send(`model id=${modelId} not found or cannot be updated.`);
                }
                res.status(200).json(`updated ${rows[0]} row${rows[0]===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

    deleteModel(req, res, next) {
        const { params: {modelId }} = req;
        
        db.Model.destroy({
            where: {
                id: modelId
            }
        })
            .then(rows => {
                if (rows === 0) {
                    return res.status(404).send(`model id=${modelId} not found or cannot be deleted.`);
                }
                res.status(200).json(`deleted ${rows} row${rows===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

}

module.exports = new ModelController();