const Joi = require('joi');

const productSchema = Joi.object({
    sku: Joi.number().integer().required(),
    categoryId: Joi.number().integer().required(),
    productName: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stateId: Joi.number().integer().required(),
});

const productIdSchema = Joi.object({
    id: Joi.number().integer().required()
})

export { productIdSchema, productSchema }