const { Router } = require('express');
const router = Router();

const { cardTransactions, transaction, addCard } = require("../controllers/card.controllers")
const middlewareCardTransaction = require("../middlewares/transactions.middlewares.js")
const middlewareAddCard = require("../middlewares/addCard.middlewares")

router.get("/:id/transactions", cardTransactions)
router.post("/transaction", middlewareCardTransaction, transaction)
router.post("/add", middlewareAddCard, addCard)

module.exports = router