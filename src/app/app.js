const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

//Routes
const RegisterRouter = require("../routes/RegisterRouter/RegisterRouter");
const LoginRouter = require("../routes/LoginRouter/LoginRouter");

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

app.use("/api", RegisterRouter);
app.use("/api", LoginRouter);

module.exports = app;