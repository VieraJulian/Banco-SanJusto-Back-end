const express = require("express");
const cors = require("cors");
const { port, start } = require("./modules/port")
const session = require("express-session")

const app = express();
app.listen(port, start);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(session({
    secret: "this is secret",
    saveUninitialized: true,
    resave: true
}))

app.use(require("./middlewares/user"))
app.use("/user", require("./routes/user.routes"));
app.use("/card", require("./routes/card.routes"));