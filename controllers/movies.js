const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-err');
const Movie = require('../models/movie');
const { CODE_200 } = require('../utils/code');

module.exports.getUserMovies = (req, res, next) => {
  const ownerId = req.user._id;
  console.log(ownerId);

  Movie.findOne({ owner: ownerId })
    .then((movie) => {
      console.log({ owner: movie.owner.toString() });
      res.send({ owner: movie.owner.toString() });
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { objectId } = req.params;
  const ownerId = req.user._id;
  console.log(req.params.objectId);

  Movie.findById(objectId)
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError('Фильм не найден');
      }

      if (movie.owner.toString() !== ownerId) {
        throw new ForbiddenError();
      }

      return movie;
    })
    .then((movie) => Movie.deleteOne(movie))
    .then((movie) => res.status(CODE_200).send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Фильм не найден'));
        return;
      }

      next(err);
    });
};
