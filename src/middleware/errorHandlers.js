const { Sequelize: { BaseError } } = require('../db/models');
const { yup } = require('../utils/schemas');

module.exports.yupValidationErrorHandler = (err, req, res, next) => {
    if(err instanceof yup.ValidationError){
        return res.status(500).send({
            title: 'Yup Validation error', 
            details: err.errors,
        })
    }
    next(err);
}
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
            details: err?.message ?? `Something went wrong`,
        }],
    });
}