require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { hostDB, port } = require('./utils/config');
const { error } = require('./errors/internal-server-error');

const { PORT, DB_HOST, NODE_ENV } = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'prodaction' ? DB_HOST : hostDB, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.listen(NODE_ENV === 'prodaction' ? PORT : port);

app.use('/', routes);

app.use(errorLogger);
app.use(errors());

app.use(error);
