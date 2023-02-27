const router = require('express').Router();

// Middlewares List
const { auth } = require('../middlewares/auth');
const { validateUser } = require('../middlewares/validation');

// Controllers list
const { bitStampTicker } = require('../controllers/bitStampTicker');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/createUser');
const { logout } = require('../controllers/logout');

// Signup, login routers - no authorization
router.post(
  '/login',
  validateUser({
    userName: 'optional',
    userEmail: 'required',
    userPassword: 'required',
  }),
  login,
);
router.post(
  '/signup',
  validateUser({
    userName: 'required',
    userEmail: 'required',
    userPassword: 'required',
  }),
  createUser,
);

// 3rd party api routers - no authorization
router.get('/bitstamp/:currency', bitStampTicker);
router.get('/bitstamp', bitStampTicker);

// Authorization
router.use(auth);

// Signout routers - authorization needed
router.get('/logout', logout);
router.use('/users', require('./users'));

// Wallets and Transactions routes
router.use('/transactions', require('./transactions'));

router.use('/', (req, res, next) => {
  next();
});

// router.use((req, res, next) => {
//   next(new NotFoundError('Ошибочный путь'));
// });

module.exports = router;
