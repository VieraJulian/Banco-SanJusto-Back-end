const { Router } = require('express');
const router = Router();

const middlewareLogin = require("../middlewares/login.middlewares")
const { access } = require("../controllers/user.controllers")

router.post("/login", middlewareLogin, access);

module.exports = router