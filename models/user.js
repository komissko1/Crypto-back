const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/AuthorizationError');
const { errorMessages } = require('../utils/utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        const regex = /[a-zA-Z0-9._%+-]+\x40[a-zA-Z0-9.-]+\x2E[a-zA-Z]{2,}/gi;
        return regex.test(v);
      },
      message: 'is not an e-mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(v) {
        const regex = /[\w!@#&()$'{%}:;',?*~$^+=<>]/gi;
        return regex.test(v);
      },
      message:
        'Use only latin letters, digits and special symbols',
    },
  },
  dateStamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

userSchema.statics.findUserByLoginData = function ({ email, password }) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new AuthorizationError(errorMessages.wrongCredentials),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new AuthorizationError(errorMessages.wrongCredentials),
          );
        }
        const newUser = user.toObject();
        delete newUser.password;
        return newUser;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
