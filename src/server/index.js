const debug = require("debug")("robots-app:server");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const { notFoundError, internalServerError } = require("./middlewares/errors");
const robotsRouter = require("./routers/robotsRouter");

const app = express();

const serverUp = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`The server it's up in http://localhost:${port}`);
      resolve();
    });

    server.on("error", (error) => {
      debug(`Oh no the server couldnt start ${error.message}`);
      reject();
    });
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/robots", robotsRouter);

app.use(notFoundError);
app.use(internalServerError);

module.exports = serverUp;
