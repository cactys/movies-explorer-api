const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUserMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { patternUrl } = require('../utils/pattern');

router.get('/', getUserMovies);

router.post('/', celebrate({
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
}), createMovie);

router.delete('/:objectId', celebrate({
  params: Joi.object().keys({
    objectId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
