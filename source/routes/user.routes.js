const { Router } = require('express');
const router = Router();

const middlewareLogin = require("../middlewares/login.middlewares")
const { access, transaction } = require("../controllers/user.controllers")

router.post("/login", middlewareLogin, access);
router.get("/card/transactions/:id", transaction)

module.exports = router