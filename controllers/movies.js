const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-err');
const Movie = require('../models/movie');
const { CODE_200 } = require('../utils/code');

module.exports.getUserMovies = (req, res, next) => {
  Movie.find({ ...req.body, owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
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
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { objectId } = req.params;
  const ownerId = req.user._id;

  Movie.findById(objectId)
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError();
      }

      if (movie.owner.toString() !== ownerId) {
        throw new ForbiddenError();
      }

      return movie;
    })
    .then((movie) => {
      Movie.deleteOne(movie)
        .then(() => {
          res.status(CODE_200).send({ message: 'delete' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }

      next(err);
    });
};
