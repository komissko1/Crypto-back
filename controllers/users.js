const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const UserExistsError = require('../errors/UserExistsError');
const { errorMessages } = require("../utils/utils");

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.userNotFound);
      } else {
        res.status(201).send(user);
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user || JSON.stringify(user._id) === JSON.stringify(req.user._id)) {
        User.findByIdAndUpdate(
          req.user._id,
          { name, email },
          { new: true, runValidators: true },
        )
          .orFail()
          .then((updatedUser) => {
            res.status(201).send(updatedUser);
          })
          .catch(next);
      } else {
        throw new UserExistsError(errorMessages.userExists);
      }
    })
    .catch(next);
};
