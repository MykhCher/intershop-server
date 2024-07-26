const yup = require('yup');

module.exports.yup = yup;

const nameScheme = yup.string().trim().min(2).max(255).required();

module.exports.customerValidationSchema = yup.object().shape({
    full_name: nameScheme,
    email: yup
        .string()
        .required()
        .email()
        .trim()
        .min(5)
        .max(255),
    password: yup
        .string()
        .required()
        .min(8)
        .matches(/[a-zA-Z\d][@$!%*#?&]?/),
})

module.exports.orderValidationSchema = yup.object().shape({
    code: yup
        .number()
        .integer()
        .positive(),
    date: yup
        .date()
        .min('2015-01-01'),
    paid: yup.boolean(),
})

module.exports.basicInstanceValidationSchema = yup.object().shape({
    title: nameScheme,
    desciption: yup.string().trim()
})
module.exports.itemValidationSchema = yup.object().shape({
    price: yup.number().positive(),
    amount: yup.number().positive(),
    categoryId: yup.number().integer().positive(),
    modelId: yup.number().integer().positive(),
    brandId: yup.number().integer().positive(),
    storeId: yup.number().integer().positive(),
    typeId: yup.number().integer().positive()
})

module.exports.paginationSchema = yup.object().shape({
    limit: yup.number().integer().min(1).max(100).required(),
    offset: yup.number().integer().required().min(0),
})
 