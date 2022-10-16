const express = require("express");
const cors = require("cors");
const { port, start } = require("./modules/port")

const app = express();
app.listen(port, start);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(require("./routes/user.routes"))