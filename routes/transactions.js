const router = require("express").Router();
const {
  getTransactions,
  createTransaction,
} = require("../controllers/transactions");
const { validateTransaction } = require("../middlewares/validation");

router.post("/", validateTransaction, createTransaction);
router.get("/", getTransactions);

module.exports = router;
