const User = require("../models/user");
const NotFoundError = require("../errors/NotFoundError");
const { errorMessages } = require("../utils/utils");
const wallets = require("./wallets");

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.userNotFound);
      } else {
        wallets
          .getWallet(user._id)
          .then((wallet) => res.status(200).send({user, wallet}))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user && JSON.stringify(user._id) === JSON.stringify(req.user._id)) {
        User.findByIdAndUpdate(
          req.user._id,
          { name, email },
          { new: true, runValidators: true }
        )
          .orFail()
          .then((updatedUser) => {
            res.status(200).send(updatedUser);
          })
          .catch(next);
      } else {
        throw new NotFoundError(errorMessages.userNotFound);
      }
    })
    .catch(next);
};
