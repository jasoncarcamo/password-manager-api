const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));


module.exports = app;