const { Router } = require('express');
const router = Router();

const { cardTransactions, transaction } = require("../controllers/card.controllers")

router.get("/:id/transactions", cardTransactions)
router.post("/transaction", transaction)

module.exports = router