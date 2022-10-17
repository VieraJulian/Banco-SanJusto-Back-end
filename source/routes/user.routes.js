const { Router } = require('express');
const router = Router();

const middlewareLogin = require("../middlewares/login.middlewares")
const { access, cardTransactions, transaction } = require("../controllers/user.controllers")

router.post("/login", middlewareLogin, access);
router.get("/card/:id/transactions", cardTransactions)
router.post("/transaction", transaction)

module.exports = router