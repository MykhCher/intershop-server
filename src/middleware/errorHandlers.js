const { Sequelize: { BaseError } } = require('../db/models');

module.exports.sequelizeErrorHandler = (err, req, res, next) => {
    if (err instanceof BaseError) {
        return res.status(500).send({
            title: 'Sequelize Error',
            message: err.message,
        });

    }
    next(err);
}

module.exports.errorHandler = (err, req, res, next) => {

    if(res.headerSent){
        
        return;
    }

    res.status(err?.status ?? 500).send({
        errors: [{
            title: err?.name ?? `Internal server error`,
            details: err?.message ?? `Something went wrong`}],
    });
}