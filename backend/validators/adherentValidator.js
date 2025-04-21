import Joi from 'joi';

export const adherentValidator = Joi.object({
  nom: Joi.string().required().min(2).max(20),
  prenom: Joi.string().required().min(2).max(20),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  telephone: Joi.string().required().min(8).max(20),
  actif: Joi.boolean()
});
