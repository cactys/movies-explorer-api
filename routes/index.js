const router = require('express').Router();
const { registration, login, signOut } = require('../controllers/users');
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { signIn, signUp } = require('../validators/auth');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', signIn, login);

router.post('/signup', signUp, registration);

router.post('/signout', auth, signOut);
router.use('/users', auth, users);
router.use('/movies', auth, movies);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
