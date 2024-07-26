const { paginationSchema } = require('../utils/schemas');

module.exports = (req, res, next) => {
    const { page, result } = req.query;

    const defaultPagination = {
        limit: 10,
        offset: 0
    }

    const pagination = {
        limit: result ?? 10,
        offset: ((page - 1) * result) || 0 
    }

    paginationSchema.isValid(pagination)
        .then(isValid => {
            isValid ? req.pagination = pagination : req.pagination = defaultPagination;
            // if (isValid) {
            //     req.pagination = pagination
            // } else {
            //     req.pagination = defaultPagination
            // }
            next();
        })
        .catch(err => next(err));
}