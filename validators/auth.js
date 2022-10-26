const { celebrate, Joi } = require('celebrate');

module.exports.signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.signUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi
      .string()
      .required()
      .trim()
      .min(2)
      .max(30),
  }),
});
