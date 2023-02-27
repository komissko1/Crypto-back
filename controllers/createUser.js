const bcrypt = require('bcryptjs');
const User = require('../models/user');
const wallets = require('./wallets');
const UserExistsError = require('../errors/UserExistsError');
const WrongDataError = require('../errors/WrongDataError');
const { errorMessages } = require('../utils/utils');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then((data) => {
        delete data.password;
        wallets.createWallet(data._id)
          .then((newWallet) => res.status(201).send({ user: data, wallet: newWallet, message: 'User Created' }))
          .catch();
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new WrongDataError(errorMessages.wrongUserData);
        }
        if (err.code === 11000) {
          throw new UserExistsError(errorMessages.userExists);
        }
        return next(err);
      }))
    .catch(next);
};
