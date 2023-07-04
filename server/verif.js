const Joi = require("joi");

const articleSchemaJoi = Joi.object({
    title : Joi.string().min(2).max(60).required(),
    content : Joi.string().max(1000000).required(),
    image : Joi.string(),
    date : Joi.date()
});

module.exports.articleSchemaJoi = articleSchemaJoi;