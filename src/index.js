require("dotenv").config();
const debug = require("debug")("robots-app:root");

const serverPort = process.env.SERVER_PORT;

debug(serverPort);
