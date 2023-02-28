const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  creditedCurrency: {
    type: String,
    required: true,
  },
  debitedCurrency: {
    type: String,
    required: true,
  },
  creditedAmount: {
    type: Number,
    required: true,
  },
  debitedAmount: {
    type: Number,
    required: true,
  },
  dateStamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'wallet',
    required: true,
  },
});

module.exports = mongoose.model('transaction', transactionSchema);
