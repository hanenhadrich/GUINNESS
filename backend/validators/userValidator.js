const Joi = require("joi");



const registerValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
})

const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
})

module.exports = {
  registerValidator,
  loginValidator
}