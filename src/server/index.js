const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const { notFoundError, internalServerError } = require("./middlewares/errors");
const startServer = require("./startServer");
const loginRouter = require("./routers/loginRouter");
const robotsRouter = require("./routers/robotsRouter");

const app = express();

startServer(app);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/robots", robotsRouter);
app.use("/login", loginRouter);

app.use(notFoundError);
app.use(internalServerError);

module.exports = app;
