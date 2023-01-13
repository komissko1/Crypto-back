const router = require('express').Router();

const { ticker } = require('../controllers/ticker');

router.get('/bitstamp', ticker);

router.use('/', (req, res, next) => { next(); });

// router.use((req, res, next) => {
//   next(new NotFoundError('Ошибочный путь'));
// });

module.exports = router;