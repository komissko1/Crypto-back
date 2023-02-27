const Wallet = require('../models/wallet');
const CreationError = require('../errors/CreationError');
const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../utils/utils');

module.exports.getWallet = (userId) => Wallet.findOne({ owner: userId })
  .then((wallet) => wallet)
  .catch(() => {
    throw new NotFoundError(errorMessages.walletNotFound);
  });

module.exports.createWallet = (userId) => Wallet.create({
  owner: userId,
})
  .then((newWallet) => newWallet)
  .catch(() => {
    throw new CreationError(errorMessages.walletNotCreated);
  });

module.exports.updateWallet = (data) => {
  const {
    creditedCurrency,
    creditedAmount,
    debitedCurrency,
    debitedAmount,
    walletId,
  } = data;
  return Wallet.findOne({ walletId })
    .then((wallet) => {
      if (!wallet) {
        throw new NotFoundError(errorMessages.walletNotFound);
      } else {
        wallet.currencies[creditedCurrency] -= creditedAmount;
        wallet.currencies[debitedCurrency] =
          (wallet.currencies[debitedCurrency] || 0) + debitedAmount;
        return Wallet.findByIdAndUpdate(
          wallet._id,
          { currencies: wallet.currencies },
          { new: true, runValidators: true },
        )
          .orFail()
          .then((updatedWallet) => updatedWallet)
          .catch();
      }
    })
    .then((result) => result)
    .catch();
};
