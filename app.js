require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const movies = require('./routes/movies');
const users = require('./routes/users');
const routes = require('./routes');
const NotFoundError = require('./errors/not-found-err');
const { ERROR_500 } = require('./utils/code');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_HOST, DB_PORT } = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/moviedb`, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.listen(PORT);

app.use(cors);

app.use('/', routes);

app.use(auth);

app.use('/users', users);
app.use('/movies', movies);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});
