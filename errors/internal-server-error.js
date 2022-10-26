const { ERROR_500 } = require('../utils/code');

module.exports.error = (err, req, res, next) => {
  const { statusCode = ERROR_500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
};
