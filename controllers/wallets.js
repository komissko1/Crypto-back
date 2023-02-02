const Wallet = require("../models/wallet");
const WalletCreationError = require("../errors/WalletCreationError");
const WalletNotFoundError = require("../errors/WalletNotFoundError");
const { errorMessages } = require("../utils/utils");

module.exports.getWallet = (userId) => {
  return Wallet.findOne({ owner: userId })
    .then((wallet) => wallet)
    .catch(() => {
      throw new WalletNotFoundError(errorMessages.walletNotFound);
    });
};

module.exports.createWallet = (userId) => {
  return Wallet.create({
    owner: userId,
  })
    .then((newWallet) => newWallet)
    .catch(() => {
      throw new WalletCreationError(errorMessages.walletNotCreated);
    });
};

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
      if (wallet) {
        wallet.currencies[creditedCurrency] =
          wallet.currencies[creditedCurrency] - creditedAmount;
        wallet.currencies[debitedCurrency] =
          (wallet.currencies[debitedCurrency] || 0 ) + debitedAmount;
        return Wallet
          .findByIdAndUpdate(
            wallet._id,
            { currencies: wallet.currencies },
            { new: true, runValidators: true }
          )
          .orFail()
          .then((updatedWallet) => updatedWallet)
          .catch();
      }
    })
    .then((data) => data)
    .catch(() => {
      throw new WalletNotFoundError(errorMessages.walletNotFound);
    });
};
