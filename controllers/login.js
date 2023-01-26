const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthorizationError = require('../errors/AuthorizationError');
const { errorMessages } = require("../utils/utils");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByLoginData({ email, password })
    .then((user) => {
      if (!user) { throw new AuthorizationError(errorMessages.userNotFound); }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'JWT_KEY',
        {
          expiresIn: '1h',
        },
      );
      return res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          secure: true,
          sameSite: true
        })
        .status(201).send({
          user,
          message: 'Successfuly logged in',
        });
    })
    .catch(next);
};
