const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  currencies: {
    type: Object,
    required: true,
    default: { USDT: 10000, ETH: 10 },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('wallet', walletSchema);
