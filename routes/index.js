const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { registration, login, signOut } = require('../controllers/users');
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), registration);

router.post('/signout', signOut);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);

module.exports = router;
