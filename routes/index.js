const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { registration, login, signOut } = require('../controllers/users');
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');

router.post('/api/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/api/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().trim().min(2).max(30),
  }),
}), registration);

router.post('/api/signout', signOut);

router.use(auth);

router.use('/api/users', users);
router.use('/api/movies', movies);

module.exports = router;
