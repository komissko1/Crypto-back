const router = require("express").Router();
const { celebrate, Joi} = require('celebrate');


// Middlewares List
const { auth } = require("../middlewares/auth");
const { validateUser } = require('../middlewares/validation');

// Controllers list
const { bitStampTicker } = require("../controllers/bitStampTicker");
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/createUser');
const { logout } = require('../controllers/logout');

// Signup, login routers - no authorization
router.post(
  "/login",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().pattern(/[a-zA-Z0-9._%+-]+\x40[a-zA-Z0-9.-]+\x2E[a-zA-Z]{2,}/),
      password: Joi.string().required(),
    }),
  }),
  login
);
router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().alphanum().min(2).max(30),
      email: Joi.string().pattern(/[a-zA-Z0-9._%+-]+\x40[a-zA-Z0-9.-]+\x2E[a-zA-Z]{2,}/),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

// 3rd party api routers - no authorization
router.get("/bitstamp/:currency", bitStampTicker);
router.get("/bitstamp", bitStampTicker);

// Authorization
router.use(auth);

// Signout routers - authorization needed
router.get("/logout", logout);
router.use('/users', require('./users'));

router.use("/", (req, res, next) => {
  next();
});

// router.use((req, res, next) => {
//   next(new NotFoundError('Ошибочный путь'));
// });

module.exports = router;
