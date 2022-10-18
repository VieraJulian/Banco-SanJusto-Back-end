const { Router } = require('express');
const router = Router();

const { cardTransactions, transaction } = require("../controllers/card.controllers")
const middlewareTransaction = require("../validations/transaction.validation")

router.get("/:id/transactions", cardTransactions)
router.post("/transaction", middlewareTransaction, transaction)

module.exports = router