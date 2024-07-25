const schemas = require('../utils/schemas');

module.exports.validateCustomer = async(req, res, next) => {
    const { body } = req;
    try {
        const validatedCustomer = await schemas.customerValidationSchema
            .validate(body, {abortEarly: false});
        
            req.body = validatedCustomer;
            next();
    } catch (error) {
        next(error);
    }
}
module.exports.validateOrder = async(req, res, next) => {
    const { body } = req;
    try {
        const validatedOrder = await schemas.orderValidationSchema
            .validate(body, {abortEarly: false});
        
            req.body = validatedOrder;
            next();
    } catch (error) {
        next(error);
    }
}
module.exports.validateInstance = async(req, res, next) => {
    const { body } = req;
    try {
        const validatedInstance = await schemas.basicInstanceValidationSchema
            .validate(body, {abortEarly: false});
        
            req.body = validatedInstance;
            next();
    } catch (error) {
        next(error);
    }
}
module.exports.validateItem = async(req, res, next) => {
    const { body } = req;
    try {
        const validatedItem = await schemas.itemValidationSchema
            .validate(body, {abortEarly: false});
        
            req.body = validatedItem;
            next();
    } catch (error) {
        next(error);
    }
}