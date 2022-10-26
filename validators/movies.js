const { celebrate, Joi } = require('celebrate');
const { patternUrl } = require('../utils/pattern');

module.exports.addMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().regex(patternUrl).required(),
    trailerLink: Joi.string().uri().regex(patternUrl).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().uri().regex(patternUrl).required(),
    movieId: Joi.number().required(),
  }),
});

module.exports.deleteMovie = celebrate({
  params: Joi.object().keys({
    objectId: Joi.string().required().hex().length(24),
  }),
});
