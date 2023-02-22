module.exports = class DbConnectionError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
