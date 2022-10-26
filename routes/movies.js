const router = require('express').Router();
const { getUserMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { addMovie } = require('../validators/movies');

router.get('/', getUserMovies);

router.post('/', addMovie, createMovie);

router.delete('/:objectId', deleteMovie, deleteMovie);

module.exports = router;
