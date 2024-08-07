const { Brand, Sequelize: { Op } } = require('../db/models');

const createError = require('http-errors');

class BrandController {
    getAllBrands(req, res, next) {
        const { limit, offset } = req.pagination;
        Brand.findAll({limit, offset})
            .then(brands => {
                res.status(200).send(brands[0] ? brands : 'It seems to be empty here... \nPlease, try different request');
            })
            .catch(err => next(err));
    }

    getBrandsPartially(req, res, next) {
        Brand.count()
            .then(count => {
                Brand.findAll({
                    where: {
                        id: {
                            [Op.gt]: Math.floor(count/2)
                        }
                    },
                }).then(brands => {
                    res.status(200).json(brands);
                });
            })
            .catch(err => next(err));
    }

    getBrandsByTitles(req, res, next) {
        const { title } = req.query;
        Brand.findAll({where: {
            title: title instanceof Array 
            ? {
                [Op.in]: title
                }
            : title
        }})
            .then(brands => {
                brands[0]
                    ? res.status(200).json(brands)
                    : next(createError(404, 'brands not found'));
            })
            .catch(err => next(err));

            
    }

    getBrandsById(req, res, next) {
        const { brandId } = req.params;
        Brand.findByPk(brandId)
            .then(brand => {
                res.status(brand ? 200 : 404).json(brand ?? `brand id=${brandId} not found`);
            })
            .catch(err => next(err));
    }

    createBrand(req, res, next) {
        const { body } = req;
        Brand.create(body, {
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

        Brand.update(req.body, {
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
        
        Brand.destroy({
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