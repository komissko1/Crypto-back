const { celebrate, Joi } = require("celebrate");

module.exports.validateUser = ({ userName, userEmail, userPassword }) =>
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).presence(userName),
      email: Joi.string()
        .pattern(/[a-zA-Z0-9._%+-]+\x40[a-zA-Z0-9.-]+\x2E[a-zA-Z]{2,}/)
        .presence(userEmail),
      password: Joi.string()
        .pattern(/[\w!@#&()$'{%}:;',?*~$^+=<>]/i)
        .presence(userPassword),
    }),
  });

module.exports.validateTransaction = celebrate({
    body: Joi.object().keys({
      creditedCurrency: Joi.string().alphanum(),
      creditedAmount: Joi.number(),
      debitedCurrency: Joi.string().alphanum(),
      debitedAmount: Joi.number(),
      walletId: Joi.string(),
    }),
  });
