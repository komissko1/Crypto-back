module.exports = class WalletCreationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
