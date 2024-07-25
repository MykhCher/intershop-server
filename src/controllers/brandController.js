const db = require('../db/models');

class BrandController {
    getAllBrands(req, res, next) {
        db.Brand.findAll( {limit: 10} )
            .then(brands => {
                res.status(200).send(brands);
            })
            .catch(err => next(err));
    }

    getBrandsById(req, res, next) {
        const { brandId } = req.params;
        db.Brand.findByPk(brandId)
            .then(brand => {
                res.status(brand ? 200 : 404).json(brand ?? `brand id=${brandId} not found`);
            })
            .catch(err => next(err));
    }

    createBrand(req, res, next) {
        const { body } = req;
        db.Brand.create(body, {
            returning: '*'
        })
            .then(brand => {
                res.status(201).json(brand);
            })
            .catch(err => next(err));
    }

    updateBrand(req, res, next) {
        const brandId = req.body.id;
        if (!brandId) {
            return res.status(404).send('Can\'t find brand. Please provide id in request body.');
        }

        db.Brand.update(req.body, {
            where: {
                id: Number(brandId)
            }
        })
            .then(rows => {
                if (rows[0] === 0) {
                    return res.status(404).send(`brand id=${brandId} not found or cannot be updated.`);
                }
                res.status(200).json(`updated ${rows[0]} row${rows[0]===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

    deleteBrand(req, res, next) {
        const { params: {brandId }} = req;
        
        db.Brand.destroy({
            where: {
                id: brandId
            }
        })
            .then(rows => {
                if (rows === 0) {
                    return res.status(404).send(`brand id=${brandId} not found or cannot be deleted.`);
                }
                res.status(200).json(`deleted ${rows} row${rows===1 ? '' : 's'}.`);
            })
            .catch(err => next(err));
    }

}

module.exports = new BrandController();