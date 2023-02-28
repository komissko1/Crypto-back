const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../utils/utils');

module.exports.logout = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.userNotFound);
      } else {
        res.clearCookie('jwt', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });
        res.status(200).send({ message: 'Logged out. See you later' });
      }
    })
    .catch(next);
};
