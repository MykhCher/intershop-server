const db = require('../db/models');

class CategoryController {
    getAllCategories(req, res, next) {
        db.Category.findAll( {limit: 10} )
            .then(categories => {
                res.status(200).send(categories);
            })
            .catch(err => next(err));
    }

    getCategoriesById(req, res, next) {
        const { categoryId } = req.params;
        db.Category.findByPk(categoryId)
            .then(category => {
                res.status(category ? 200 : 404).json(category ?? `category id=${categoryId} not found`);
            })
            .catch(err => next(err));
    }

    createCategory(req, res, next) {
        const { body } = req;
        db.Category.create(body, {
            returning: '*'
        })
            .then(category => {
                res.status(201).json(category);
            })
            .catch(err => next(err));
    }

    updateCategory(req, res, next) {
        const categoryId = req.body.id;
        if (!categoryId) {
            return res.status(404).send('Can\'t find category. Please provide id in request body.');
        }

        db.Category.update(req.body, {
            where: {
                id: Number(categoryId)
            }
        })
            .then(rows => {
                if (rows[0] === 0) {
                    return res.status(404).send(`category id=${categoryId} not found or cannot be updated.`);
                }
                res.status(200).json(`updated ${rows[0]} row${rows[0]===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

    deleteCategory(req, res, next) {
        const { params: {categoryId }} = req;
        
        db.Category.destroy({
            where: {
                id: categoryId
            }
        })
            .then(rows => {
                if (rows === 0) {
                    return res.status(404).send(`category id=${categoryId} not found or cannot be deleted.`);
                }
                res.status(200).json(`deleted ${rows} row${rows===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

}

module.exports = new CategoryController();