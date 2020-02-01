const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const {NODE_ENV} = require("../../config");

//Routes
const RegisterRouter = require("../routes/RegisterRouter/RegisterRouter");
const LoginRouter = require("../routes/LoginRouter/LoginRouter");
const UsersRouter = require("../routes/UsersRouter/UsersRouter");
const AccountsRouter = require("../routes/AccountsRouter/AccountsRouter");

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());


app.use("/api", RegisterRouter);
app.use("/api", LoginRouter);
app.use("/api", UsersRouter);
app.use("/api", AccountsRouter);

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: 'Server error' }
    } else {
      
      response = { error: error.message, object: error }
    }
    console.error(error)
    res.status(500).json(response)
  });

app.use("/", (req, res)=>{
    return res.send("Working")
})

module.exports = app;