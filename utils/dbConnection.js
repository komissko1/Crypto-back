const mongoose = require("mongoose");
const DbConnectionError = require('../errors/DbConnectionError');
const { errorMessages } = require("../utils/utils");
const { NODE_ENV, DB_ADRESS } = process.env;

module.exports.mongo = async () => {
  try {
    mongoose.connect(
      NODE_ENV === "production"
        ? DB_ADRESS
        : "mongodb://localhost:27017/cryptodb",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (err) {
    return next(new DbConnectionError(errorMessages.DBconnectionFail));
  }
  return next();
};
