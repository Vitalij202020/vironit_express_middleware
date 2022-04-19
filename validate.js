const Joi = require('joi')

const schema = Joi.object().keys({
    name: Joi.string().min(2).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(5).max(100).required()
})

module.exports = schema


