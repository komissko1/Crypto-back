const Transaction = require("../models/transaction");
const NotFoundError = require("../errors/NotFoundError");
const { errorMessages } = require("../utils/utils");
const wallets = require("./wallets");

module.exports.getTransactions = (req, res, next) => {
  Transaction.find({ owner: req.user._id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
};

module.exports.createTransaction = (req, res, next) => {
  const { creditedCurrency, creditedAmount, debitedCurrency, debitedAmount, walletId } =
    req.body;
  Transaction.create({
    creditedCurrency,
    creditedAmount,
    debitedCurrency,
    debitedAmount,
    owner: req.user._id,
    wallet: walletId
  })
    .then((data) => {
      wallets
        .updateWallet(data)
        .then((wallet) => res.status(201).send(wallet))
        .catch(next);
    })
    .catch(next);
};
