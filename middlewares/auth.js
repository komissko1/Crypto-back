const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { errorMessages } = require('../utils/utils');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthorizationError(errorMessages.userNotAuthorised));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'JWT_KEY');
  } catch (err) {
    return next(new AuthorizationError(errorMessages.userNotAuthorised));
  }
  req.user = payload;
  return next();
};
