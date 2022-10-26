const validator = require('validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, '{VALUE} обязательное поле для ввода'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Не верный формат почты',
      },
    },
    password: {
      type: String,
      required: [true, '{VALUE} обязательное поле для ввода'],
      select: false,
    },
    name: {
      type: String,
      required: [true, '{VALUE} обязательное поле для ввода'],
      minlength: [2, 'Должно быть, не меньше 2 символа, получено {VALUE}'],
      maxlength: [30, 'Должно быть, не больше 30 символов, получено {VALUE} '],
    },
  },
  {
    toObject: {
      useProjection: true,
    },
  },
  null,
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неверно указаны почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неверно указаны почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
