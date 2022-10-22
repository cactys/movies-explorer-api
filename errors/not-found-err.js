const { ERROR_404 } = require('../utils/code');

class NotFoundError extends Error {
  constructor(message = 'запрашиваемый ресурс не найден') {
    super(message);
    this.statusCode = ERROR_404;
  }
}

module.exports = NotFoundError;
