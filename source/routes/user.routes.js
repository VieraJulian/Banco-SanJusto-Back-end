const { Router } = require('express');
const router = Router();

const { access } = require("../controllers/user.controllers")

router.post("/user/login", access)

module.exports = router